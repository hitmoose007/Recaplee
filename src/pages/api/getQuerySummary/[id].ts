import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import isLoggedIn from '@/lib/isLoggedIn';

export default isLoggedIn(async (req, res, user) => {
  try {
    const { id } = req.query;
    // console.log(req.query, 'the real mvp');

    const userIdBody = req.body['userId'];

    if (userIdBody !== user.id) {
      res.status(403).json({
        error: `You don't have permission to access this query.`,
      });
      return;
    }

    // console.log(id, 'the real mvp')
    const queryResult = await prisma.targetQuery.findFirst({
      where: {
        id: id as Prisma.UuidFilter,
      },
    });

    //check if query match user id
    if (queryResult?.user_id !== user.id) {
      res.status(403).json({
        error: `You don't have permission to access this query.`,
      });
      return;
    }

    const competitorsResult = await prisma.competitor.findMany({
      where: {
        query_id: id as Prisma.UuidFilter,
      },
    });
    console.log(competitorsResult);

    res
      .status(200)
      .json({ querySummary: queryResult, competitors: competitorsResult });
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
});
