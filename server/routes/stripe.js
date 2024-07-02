const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getUserById, updateUserPaymentStatus, getUserByStripeCustomerId, updateStripeCustomerId } = require('../models/userModel');

router.post('/create-checkout-session', async (req, res) => {
  const { priceId, userId } = req.body;

  try {
    console.log(`Received priceId: ${priceId}, userId: ${userId}`);
    const user = await getUserById(userId);
    if (!user) {
      console.log(`No user found with ID: ${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(`User found: ${JSON.stringify(user)}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      automatic_tax: { enabled: true },
      success_url: `${process.env.DOMAIN}/success`,
      cancel_url: `${process.env.DOMAIN}/canceled`,
      client_reference_id: userId,
      customer: user.stripe_customer_id,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

      try {
        await updateStripeCustomerId(session.client_reference_id, session.customer);
        console.log('Stripe customer ID updated successfully.');

        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        const priceId = subscription.items.data[0].price.id;

        const user = await getUserByStripeCustomerId(session.customer);
        if (user) {
          let planName;
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
            default:
              planName = 'None';
          }

          await updateUserPaymentStatus(user.id, true, session.subscription, planName);
          console.log('User payment status updated successfully.');
        }
      } catch (error) {
        console.error(`Error updating user: ${error.message}`);
      }
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;

      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0].price.id;

        console.log('Invoice payment succeeded:', invoice);
        console.log('Subscription details:', subscription);
        console.log('Price ID:', priceId);

        const stripeCustomerId = invoice.customer;
        const user = await getUserByStripeCustomerId(stripeCustomerId);
        console.log(`User found: ${JSON.stringify(user)}`);

        let planName;
        switch (priceId) {
          case 'price_1PKOtk2KoGC9FXDgtU7cuYnO':
          case 'price_1PKOtk2KoGC9FXDgn2CGgXR5':
            planName = 'Pro';
            break;
          case 'price_1PKOsm2KoGC9FXDg42Tta0JW':
          case 'price_1PKOsm2KoGC9FXDgJi4UOohD':
            planName = 'Standard';
            break;
          case 'price_1PKOu72KoGC9FXDgT425OKJ3':
          case 'price_1PKOub2KoGC9FXDgKKR0cUa1':
            planName = 'Ultimate';
            break;
          default:
            planName = 'Standard';
        }

        await updateUserPaymentStatus(user.id, true, subscriptionId, planName);
      } catch (error) {
        console.error(`Error updating user: ${error.message}`);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
