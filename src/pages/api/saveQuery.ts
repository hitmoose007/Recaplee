import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import extractDomain from 'extract-domain';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { maxCompetitors } from '@/utils/apiHelper';
// import { prisma } from '../../lib/db';

const maxPage = 2;
const maxResults = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.cookies.userId;
    

    //get competitors number tracked from database
    const competitorsTracked = await prisma.profiles.findFirst({
      where: { id: userId },
      select: { competitors_tracked: true },
    });

    const filteredQuery = req.body['competitors'];
    const customCompetitors = req.body['customCompetitors'];

    const totalCompetitors = filteredQuery.length + customCompetitors.length;

    if (
      totalCompetitors + competitorsTracked?.competitors_tracked >=
      maxCompetitors
    ) {
      res.status(403).json({
        error: `You have reached your competitors limit.`,
      });
      return;
    }
    const query = await prisma.targetQuery.create({
      data: {
        // user_id: req.body['userId'],
        user_id: userId,
        query_name: req.body['query'],
        country: req.body['country'],
        google_domain: req.body['countryDomain'],
        is_pc: req.body['isPC'],
        competitors_tracked: req.body['competitors_tracked'],
        Competitor: {
          create: filteredQuery.map((competitor: any) => {
            return {
              title: competitor.title,
              link: competitor.link,
              domain: competitor.domain,
              current_position: competitor.position_overall,
            };
          }),
        },
      },
    });

    const customCompetitorsQuery = await prisma.competitor.createMany({
      //map over the data
      data: customCompetitors.map((competitor: any) => {
        return {
          title: extractDomain(competitor),
          link: competitor,
          domain: extractDomain(competitor),

          is_custom: true,
          query_id: query.id,
        };
      }),
    });
    //get filtered query length and custom query length

    //increment the number of queries
    await prisma.profiles.update({
      where: {
        id: userId,
      },
      data: {
        query_monitored: {
          increment: 1,
        },
        competitors_tracked: {
          increment: totalCompetitors,
        },
      },
    });

    res.status(200).json({ customCompetitorsQuery });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // handle error of type Error
      console.log(error.message);
      res.status(500).json({ error: error.message });
    } else {
      // handle error of unknown type
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
