import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient,Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const id = '02dfe7ac-2708-4312-86bf-2510a710c03b';
    //extract id from req
    //how to extract parameters from req
     const { id } = req.query;

    const queryResult = await prisma.targetQuery.findFirst({ where: {
        id: id as Prisma.UuidFilter,
      },
    });

    const competitorsResult = await prisma.competitor.findMany({
      where: {
        query_id: id as Prisma.UuidFilter,
      },
    });
    console.log(competitorsResult);


    res.status(200)
      .json({ querySummary: queryResult, competitors: competitorsResult });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // handle error of type Error
      console.log(error.message)
      res.status(500).json({ error: error.message });
    } else {
      // handle error of unknown type
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
