import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import extractDomain from 'extract-domain';
// import { prisma } from '../../lib/db';

const maxPage = 2;
const maxResults = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    // console.log(prisma)
    const filteredQuery = req.body['competitors'];
    const customCompetitors = req.body['customCompetitors'];
    // query: formState.query,
    // country: formState.country,
    // countryDomain: formState.countryDomain,
    // isPC: formState.isPC,
    // competitors: filteredQuery,
    // competitors_tracked: filteredQuery.lengthkey={competitor.position_overall}

    const query = await prisma.targetQuery.create({
      data: {
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

    console.log('query' , query);

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

    console.log('added' , customCompetitorsQuery);

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
