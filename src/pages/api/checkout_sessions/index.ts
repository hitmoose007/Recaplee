import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15', // You can use a specific API version if needed
});

// ...

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create Checkout Sessions from body params.
  try {
    // const userId = req.cookies.userId;
    const userId = req.body['userId'];
    const origin = req.headers.origin || 'http://localhost:3000';

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
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: 'price_1N96wGEwJCgTqEWBOtlRv6gQ',
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/subscribe`,
      cancel_url: `http://localhost:3000/subscribe`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

      console.log(checkoutSession, 'checkoutSession')
    res.status(200).json(checkoutSession);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error: 'An error occurred while creating the checkout session.',
    });
  }
}
