import isLoggedIn from '@/lib/isLoggedIn';

import { prisma } from '@/lib/prisma';

export default isLoggedIn(async (req, res, user) => {
  try {
    const userId = user.id;
    const queryId = req.body['queryId'];

    if (!queryId) {
      res.status(400).json({ error: 'Missing query id' });
      return;
    }

    const queryDeleted = await prisma.targetQuery.deleteMany({
      where: {
        id: queryId,
        user_id: userId,
      },
    });

    if (queryDeleted.count === 0) {
      res.status(403).json({
        error: `You don't have permission to delete this query.`,
      });
      return;
    }

    //reduce query monitored by one
    await prisma.profiles.update({
      where: {
        id: userId,
      },
      data: {
        query_monitored: {
          decrement: 1,
        },
      },
    });

    res.status(200).json(queryDeleted);
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
