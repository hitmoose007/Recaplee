import type { NextApiRequest, NextApiResponse } from 'next';
import { diff_match_patch } from 'diff-match-patch';
import { prisma } from '@/lib/prisma';
import 'diff-match-patch-line-and-word'; // import globally to  enhanse the class.

import Mailjet from 'node-mailjet';
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || 'your-api-key',
  apiSecret: process.env.MJ_APIKEY_PRIVATE || 'your-api-secret',
});

const buttonStyle =
  'padding: 5px 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor:pointer;';
//create queryType
interface QueryType {
  id: string;
  queryName: string;
  queryUrl: string;
  totalChanges: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //prisma query find user and their respective queries and competitors of respetive queries and group them together
    const dmp = new diff_match_patch();
    const oldText = 'He writes the letter.';
    const newText = 'She wrote the letters.';

    const diffs = dmp.diff_wordMode(oldText, newText);

    res.status(200).json({ message: 'Emails sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'hello error looll' });
  }
}
