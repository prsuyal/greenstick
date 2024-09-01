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

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'invoice.payment_succeeded':
      const subscription = event.data.object;
      const stripeCustomerId = subscription.customer;
      const user = await getUserByStripeCustomerId(stripeCustomerId);

      if (user) {
        let planName = 'None';
        if (subscription.status === 'active') {
          const priceId = subscription.items.data[0].price.id;
          switch (priceId) {
            case 'price_1PXvXF2KoGC9FXDgQ8xGpC9P':
            case 'price_1PXvXP2KoGC9FXDgK1hLoSA3':
              planName = 'Pro';
              break;
            case 'price_1PXvWF2KoGC9FXDgwDBzvzPj':
            case 'price_1PXvWd2KoGC9FXDg6uDjUcck':
              planName = 'Standard';
              break;
            case 'price_1PXvXn2KoGC9FXDgBs3OOVNi':
            case 'price_1PXvY02KoGC9FXDgIQFabFb8':
              planName = 'Ultimate';
              break;
          }
        }

        await updateUserPaymentStatus(user.id, subscription.status === 'active', subscription.id, planName);
      }
      break;
  }

  res.status(200).json({ received: true });
});

module.exports = router;