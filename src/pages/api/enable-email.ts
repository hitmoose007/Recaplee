import isLoggedIn from '@/lib/isLoggedIn';

import { prisma } from '@/lib/prisma';

export default isLoggedIn(async (req, res, user) => {
  try {
    const userId = user.id;
    const userIdBody = req.body['userId'];
    const emailEnabled = req.body['emailEnabled'];

    if (userIdBody !== userId) {
      res.status(209).json({
        id: userId,
        idBody: userIdBody,
      });
    }

    //
    const profile = await prisma.profiles.update({
      where: {
        id: userId,
      },
      data: {
        email_enabled: emailEnabled,
      },
    });

    res.status(200).json({ profile });
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
