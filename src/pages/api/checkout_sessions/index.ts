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

    const user = await prisma.profiles.findFirst({
      where: {
        id: userId,
      },
      select: {
        stripe_id: true,
        renewal_date: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: 'You are not a registered user.',
      });
    }

    if (!user?.stripe_id) {
      return res.status(400).json({
        error: 'You do not have an active subscription.',
      });
    }

    if (user?.renewal_date && user?.renewal_date > new Date()) {
      return res.status(400).json({
        error: 'You already have an active subscription.',
      });
    }

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
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
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
