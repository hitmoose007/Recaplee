import isLoggedIn from '@/lib/isLoggedIn';

import { prisma } from '@/lib/prisma';

export default isLoggedIn(async (req, res, user) => {
  try {
    const userId = user.id;
    const userIdBody = req.body['userId'];

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

    //  console.log('healo')
    // console.log(previousQueries);
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
});
