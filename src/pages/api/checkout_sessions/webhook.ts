import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { buffer } from 'micro';

import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

//create type for priceMetadata
interface Metadata {
  maxMonitoredQuery: string;
  maxResearchQuery: string;
  maxScrape: string;
}
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const buf = await buffer(req);
      const signature = req.headers['stripe-signature'] as string;

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          buf,
          signature,
          webhookSecret as string
        );
      } catch (error) {
        return res.status(400).send(error);
      }

      if (event.type === 'customer.deleted') {
        const customer = event.data.object as Stripe.Customer;

        await prisma.profiles.updateMany({
          where: {
            stripe_id: customer.id,
          },
          data: {
            stripe_id: null,
            renewal_date: null,
            maxResearchQuery: 0,
            maxScrape: 0,
            maxCustomScrape: 0,
          },
        });
      } else if (event.type === 'customer.subscription.created') {
        const subscription = event.data.object as Stripe.Subscription;

        const price = await stripe.prices.retrieve(
          subscription.metadata.priceId as string
        );

        await prisma.profiles.update({
          where: {
            id: subscription.metadata.userId as string,
          },
          data: {
            stripe_id: subscription.customer as string,
            renewal_date: new Date(subscription.current_period_end * 1000),
            maxMonitoredQuery:
              (price.metadata.maxMonitoredQuery &&
                +price.metadata.maxMonitoredQuery) ||
              null,
            maxResearchQuery:
              (price.metadata.maxResearchQuery &&
                +price.metadata.maxResearchQuery) ||
              null,

            maxScrape:
              (price.metadata.maxScrape && +price.metadata.maxScrape) || null,
            maxCustomScrape:
              (price.metadata.maxCustomScrape &&
                +price.metadata.maxCustomScrape) ||
              null,
            query_research: 0,
            competitors_tracked: 0,
          },
        });
        await prisma.profiles.update({
          where: {
            id: subscription.metadata.userId as string,
          },
          data: {
            stripe_id: subscription.customer as string,
          },
        });
      } else if (event.type === 'customer.subscription.updated') {
        //     // // Update the price id and set the new period end.
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.profiles.update({
          where: {
            id: subscription.metadata.userId as string,
          },
          data: {
            renewal_date: new Date(subscription.current_period_end * 1000),
          },
        });
      } else if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.profiles.update({
          where: {
            id: subscription.metadata.userId as string,
          },
          data: {
            renewal_date: null,
            maxResearchQuery: 0,
            maxScrape: 0,
            maxCustomScrape: 0,
          },
        });
      } else {
        console.log('Unhandled event type', event.type);
      }

      res.status(200).json({ received: true });
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
