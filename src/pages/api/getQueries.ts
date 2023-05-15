import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    console.log('tuhadi pehn di')
    // console.log('heasllo')
    const previousQueries = await prisma.targetQuery.findMany({
      select: {
        id: true,
        query_name: true,
        country: true,
        recent_update: true,
        competitors_tracked: true,
        new_changes: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 15,
    });

    //  console.log('healo')
    console.log(previousQueries)
    res.status(200).json(previousQueries);
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
