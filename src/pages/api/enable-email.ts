import isLoggedIn from '@/lib/isLoggedIn';

import { prisma } from '@/lib/prisma';

export default isLoggedIn(async (req, res, user) => {
  try {
    const userId = user.id;
    const emailEnabled = req.body['emailEnabled'];

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
