const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createUser, loginUser, updateStripeCustomerId } = require('../models/userModel');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = (email, code) => {
  const msg = {
    to: email,
    from: { email: 'info@greenstickusa.com', name: 'Greenstick' },
    subject: 'Email Verification',
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Verification email sent');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};

router.post('/register', async (req, res) => {
  const { username, fullName, email, password, dateOfBirth } = req.body;
  try {
    const newUser = await createUser(email, password, 'local', username, fullName, dateOfBirth);
    
    const customer = await stripe.customers.create({
      email: email,
      name: fullName
    });

    await updateStripeCustomerId(newUser.id, customer.id);

    sendVerificationEmail(newUser.email, newUser.verification_code);

    req.login(newUser, function(err) {
      if (err) {
        return res.status(500).json({ message: 'Login error after registration' });
      }
      return res.status(201).json(newUser);
    });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.message === 'Email in use') {
      res.status(409).json({ message: 'Email already in use' });
    } else {
      res.status(500).json({ message: 'Error registering new user.' });
    }
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if (!user.is_verified) {
      return res.status(403).json({ message: 'Email not verified. Please verify your email.' });
    }

    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({ message: 'Login error' });
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(401).json({ message: error.message });
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

router.post('/verify-email', async (req, res) => {
  const { email, code } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];

    if (user && user.verification_code === code) {
      await pool.query('UPDATE users SET is_verified = true, verification_code = null WHERE email = $1', [email]);
      res.status(200).json({ message: 'Email verified successfully!' });
    } else {
      res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email' });
  }
});


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => res.redirect('/dashboard'));

module.exports = router;
