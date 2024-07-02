const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createUser, loginUser, updateStripeCustomerId } = require('../models/userModel');

router.post('/register', async (req, res) => {
  const { username, fullName, email, password, dateOfBirth, tosChecked, mailingListChecked, betaTestingChecked } = req.body;
  try {
    const newUser = await createUser(email, password, 'local', username, fullName, dateOfBirth, tosChecked, mailingListChecked, betaTestingChecked);
    
    const customer = await stripe.customers.create({
      email: email,
      name: fullName
    });

    await updateStripeCustomerId(newUser.id, customer.id);

    req.login(newUser, function(err) {
      if (err) {
        return res.status(500).json({ message: 'Login error after registration' });
      }
      return res.status(201).json(newUser);
    });
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
  const { email, password } = req.body;
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

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => res.redirect('/dashboard'));

module.exports = router;
