import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import isLoggedIn from '@/lib/isLoggedIn';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15', // You can use a specific API version if needed
});

// ...
export default isLoggedIn(async (req, res, user) => {
  try {
    // const userId = req.cookies.userId;
    const priceId = req.body['priceId'];
    const userId = req.body['userId'];
    // const origin = req.headers.origin || 'http://localhost:3000';

    console.log('the real mvp', userId);
    //find from prisma user id and see if he has stripe id

    const user = await prisma.profiles.findFirst({
      where: {
        id: userId,
      },
      select: {
        stripe_id: true,
      },
    });

    const params: Stripe.Checkout.SessionCreateParams = {
      customer: user?.stripe_id ?? undefined,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          userId: userId,
          priceId: priceId,
        },
      },
      success_url: `http://localhost:3000/subscribe`,
      cancel_url: `http://localhost:3000/subscribe`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    res.status(200).json(checkoutSession);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error: 'An error occurred while creating the checkout session.',
    });
  }
});
