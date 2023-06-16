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
    const profile = await prisma.profiles.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!profile) {
      return res.status(400).json({
        error: 'You are not a registered user.',
      });
    }

    if (!profile?.stripe_id) {
      return res.status(400).json({
        error: 'You do not have an active subscription.',
      });
    }

    const return_url = `${process.env.NEXT_PUBLIC_BASE_URL}/dashbord`;

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_id,
      return_url,
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error: 'An error occurred while creating the checkout session.',
    });
  }
});
