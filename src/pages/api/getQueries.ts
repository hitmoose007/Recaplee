import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.cookies.userId;

    //get user id from req.body
    const userIdBody = req.body['userId'];
    // console.log('heasllo')
    console.log(userIdBody, 'userIdBody');
    console.log(userId, 'userId');
    if (userIdBody !== userId) {
      res.status(209).json({
        
        id: userId,
        idBody: userIdBody,
        
      });
    }
    


    const previousQueries = await prisma.targetQuery.findMany({
      select: {
        id: true,
        query_name: true,
        country: true,
        recent_update: true,
        competitors_tracked: true,
        new_changes: true,
      },

      where: {
        user_id: userIdBody,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 15,
    });

    console.log(previousQueries, 'previousQueries');

    //  console.log('healo')
    // console.log(previousQueries);
    res.status(200).json(previousQueries);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // handle error of type Error
      res.status(500).json({ error: error.message
     });

    } else {
      // handle error of unknown type
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
