const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createUser, loginUser, updateStripeCustomerId, verifyEmail, findUserByEmail, updateVerificationToken, findUserByToken, updateUserPassword } = require('../models/userModel');
const sgMail = require('@sendgrid/mail');
const axios = require('axios');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require('crypto');
const bcrypt = require('bcryptjs'); 

const verifyRecaptcha = async (token) => {
  if (!token) {
    throw new Error('reCAPTCHA token is missing');
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await axios.post(verifyUrl);
    if (!response.data.success) {
      throw new Error('reCAPTCHA verification failed');
    }
    return true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    throw error;
  }
};

router.post('/register', async (req, res) => {
  const { username, fullName, email, password, dateOfBirth, tosChecked, mailingListChecked, betaTestingChecked, recaptchaToken } = req.body;
  try {
    await verifyRecaptcha(recaptchaToken);
  } catch (error) {
    return res.status(400).json({ message: 'reCAPTCHA verification failed. Please try again.' });
  }
  try {
    const newUser = await createUser(email, password, 'local', username, fullName, dateOfBirth, tosChecked, mailingListChecked, betaTestingChecked);
    
    const customer = await stripe.customers.create({
      email: email,
      name: fullName
    });

    await updateStripeCustomerId(newUser.id, customer.id);

    const msg = {
      name: 'Greenstick',
      to: email,
      from: 'info@greenstickusa.com',
      subject: 'Verify Your Email for Greenstick',
      html: `Hi! 
      <br>
      <br>
      Please click on this link to verify your email: <a href="${process.env.DOMAIN}/verify-email/${newUser.verification_token}">Verify Email</a>
      <br>
      <br>
      Welcome to Greenstick!`,
    };

    await sgMail.send(msg);

    res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.message === 'Email already in use') {
      res.status(409).json({ message: 'Email already in use' });
    } else if (error.message === 'Username already taken') {
      res.status(409).json({ message: 'Username already taken' });
    } else {
      res.status(500).json({ message: 'Error registering new user.' });
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  try {
    await verifyRecaptcha(recaptchaToken);
  } catch (error) {
    return res.status(400).json({ message: 'reCAPTCHA verification failed. Please try again.' });
  }

  try {
    const user = await loginUser(email, password);
    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({ message: 'Login error' });
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  } catch (error) {
    console.error('Login error:', error.message);
    if (error.message === 'No account found with this email address' || error.message === 'Incorrect password') {
      res.status(401).json({ message: 'Invalid email or password' });
    } else if (error.message === 'Email not verified') {
      res.status(403).json({ message: 'Please verify your email before logging in.' });
    } else {
      res.status(500).json({ message: 'An error occurred during login. Please try again.' });
    }
  }
});

router.get('/verify-email/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const user = await verifyEmail(token);
    if (user) {
      res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } else {
      res.status(400).json({ message: 'Invalid or expired verification token.' });
    }
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ message: 'Error verifying email.' });
  }
});

router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.is_email_confirmed) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    const newToken = crypto.randomBytes(20).toString('hex');
    await updateVerificationToken(email, newToken);

    const msg = {
      to: email,
      from: 'info@greenstickusa.com',
      subject: 'Verify Your Email for Greenstick',
      html: `Hi! 
      <br>
      <br>
      Please click on this link to verify your email: <a href="${process.env.DOMAIN}/verify-email/${newToken}">Verify Email</a>
      <br>
      <br>
      Welcome to Greenstick!`,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: 'Verification email resent. Please check your inbox.' });
  } catch (error) {
    console.error('Error resending verification email:', error);
    res.status(500).json({ message: 'Error resending verification email.' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = crypto.randomBytes(20).toString('hex');
    await updateVerificationToken(email, token);
    const msg = {
      to: email,
      from: 'info@greenstickusa.com',
      subject: 'Password Reset - Greenstick',
      html: `Hi! 
      <br>
      <br>
      Please click on this link to reset your password: <a href="${process.env.DOMAIN}/reset-password/${token}">Reset Password</a>
      <br>
      <br>
      Thank you!`,
    };
    await sgMail.send(msg);
    res.status(200).json({ message: 'Password reset email sent. Please check your inbox.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Error sending password reset email.' });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await findUserByToken(token);
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await updateUserPassword(user.email, hashedPassword);
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => res.redirect('/dashboard'));

module.exports = router;
