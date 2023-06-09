import isLoggedIn from '@/lib/isLoggedIn';

import { prisma } from '@/lib/prisma';

export default isLoggedIn(async (req, res, user) => {
  try {
    const userId = user.id;
    const userIdBody = req.body['userId'];

    const queryId = req.body['queryId'];
    if (userIdBody !== userId) {
      res.status(209).json({
        id: userId,
        idBody: userIdBody,
      });
    }

    const queryDeleted= await prisma.targetQuery.delete({
      where: {
        id: queryId,
      },
    });

    

    //  console.log('healo')
    // console.log(previousQueries);
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
