import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const id = '02dfe7ac-2708-4312-86bf-2510a710c03b'

const result = await prisma.targetQuery.findFirst({
    where: {
        id: id,
    },
});


    res.status(200).json({result});
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
