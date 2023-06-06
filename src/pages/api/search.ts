import type { NextApiRequest, NextApiResponse } from 'next';
import { maxPage, maxResults } from '@/utils/apiHelper';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { validSubscription } from '@/utils/apiHelper';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import isLoggedIn from '@/lib/isLoggedIn';

export default isLoggedIn(async (req, res, user) => {
  const userId = user.id;
  const userIdBody = req.body['userId'];

  if (userId !== userIdBody) {
    res
      .status(403)
      .json({ error: 'You are not authorized to perform this action' });
    return;
  }

  const params = {
    api_key: process.env.NEXT_PUBLIC_VALUESERP_KEY,
    q: req.body['query'],
    max_page: maxPage,
    google_domain: req.body['countryDomain'],
    gl: req.body['country'].toLowerCase(),
    device: req.body['isPC'] === true ? 'desktop' : 'mobile',
  };

  try {
    const profile = await prisma.profiles.findFirst({
      where: { id: userId },
    });

    if (
      profile?.stripe_id !== null &&
      profile?.stripe_id !== undefined &&
      profile?.renewal_date !== null &&
      profile?.renewal_date !== undefined
    ) {
      const subscription = validSubscription(profile.renewal_date);
      if (subscription === false) {
        res.status(403).json({ error: 'You do not have valid subscription' });
        return;
      }
    }

    if (
      profile?.query_research !== null &&
      profile?.query_research !== undefined &&
      profile.maxResearchQuery !== null &&
      profile.maxResearchQuery !== undefined &&
      profile?.query_research >= profile.maxResearchQuery
    ) {
      res
        .status(403)
        .json({ error: 'You have reached your query searches limit' });
      return;
    }

    const response = await axios.get('https://api.valueserp.com/search', {
      params,
    });

    const topResults = response.data.organic_results.slice(0, maxResults);

    const update = await prisma.profiles.update({
      where: { id: userId },
      data: { query_research: { increment: 1 } },
    });
    // console.log(update)

    res.status(200).json(topResults);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // handle error of type Error
      res.status(500).json({ error: error.message });
    } else {
      // handle error of unknown type
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});
