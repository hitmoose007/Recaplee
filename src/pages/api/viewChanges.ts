import type { NextApiRequest, NextApiResponse } from 'next';
import { maxPage, maxResults } from '@/utils/apiHelper';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { validSubscription } from '@/utils/apiHelper';
import isLoggedIn from '@/lib/isLoggedIn';

export default isLoggedIn(async (req, res, user) => {
  const body = req.body;

  if (!user) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  if (!body.queryId) {
    return res.status(400).json({ error: 'Missing queryId' });
  }

  const query = await prisma.targetQuery.findFirst({
    where: { id: body.queryId },
  });

  if (!query) {
    return res.status(404).json({ error: 'Query not found' });
  }

  if (query.user_id !== user.id) {
    return res
      .status(403)
      .json({ error: 'You are not authorized to perform this action' });
  }

  await prisma.targetQuery.update({
    where: { id: body.queryId },
    data: {
      new_changes: null,
    },
  });

  return res.status(200).json({ success: true });
});
