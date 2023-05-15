import type { NextApiRequest, NextApiResponse } from 'next';
import { maxPage, maxResults, maxQueryResearch } from '@/utils/apiHelper';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //   userId: string
) {
  const userId = req.cookies.userId;
  console.log(userId)
  const params = {
    api_key: process.env.NEXT_PUBLIC_VALUESERP_KEY,
    q: req.body['query'],
    max_page: maxPage,
    google_domain: req.body['countryDomain'],
    gl: req.body['country'].toLowerCase(),
    device: req.body['isPC'] === true ? 'desktop' : 'mobile',
  };

  try {
    const data = await prisma.profiles.findFirst({
      where: { id: userId },
      select: { query_research: true },
    });

    if (
      data?.query_research !== null &&
      data?.query_research !== undefined &&
      data?.query_research >= maxQueryResearch
    ) {
      res
        .status(403)
        .json({ error: 'You have reached your query searches limit' });
      return;
    }

    const response = await axios.get('https://api.valueserp.com/search', {
      params,
    });

    // console.log('teri maa ki chut')
    // print the JSON response from VALUE SERP

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
}
