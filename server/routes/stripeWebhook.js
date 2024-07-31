const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getUserByStripeCustomerId, updateUserPaymentStatus, updateStripeCustomerId } = require('../models/userModel');

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      await updateStripeCustomerId(session.client_reference_id, session.customer);

      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      const stripeCustomerId = invoice.customer;

      const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
      const priceId = subscription.items.data[0].price.id;

      const user = await getUserByStripeCustomerId(stripeCustomerId);

      if (user) {
        await updateUserPaymentStatus(user.id, true, invoice.subscription, priceId);
      }

      break;
  }

  res.status(200).json({ received: true });
});

module.exports = router;
