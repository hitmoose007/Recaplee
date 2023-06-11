import type { NextApiRequest, NextApiResponse } from 'next';
import { diff_match_patch } from 'diff-match-patch';
import { diff } from 'json-diff';
import { filterResponse } from '@/utils/apiHelper';
import { parsedChanges1, parsedJson1, parsedJson2 } from '../../utils/test';
import { prisma } from '@/lib/prisma';
import Mailjet from 'node-mailjet';
import { QuerySummary } from '@/types/my-types';
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
    const profiles = await prisma.profiles.findMany({
      include: {
        TargetQuery: {
          include: {
            Competitor: {},
          },
        },
      },

      where: {
        email_enabled: true,
      },
    });

    const promises = profiles.map(async (profile) => {
      //collect changes for each query and send email to user

      const queryArray: QueryType[] = [];

      profile.TargetQuery.map((query, index) => {
        let totalChanges = 0;
        query.Competitor.map((competitor) => {
          totalChanges += competitor.changes_detected || 0;
        });

        if (totalChanges > 0) {
          queryArray.push({
            id: query.id,
            queryName: query.query_name || 'No query name',
            totalChanges: totalChanges,
            queryUrl:
              process.env.NEXT_PUBLIC_BASE_URL + '/querySummary/' + query.id,
          });
        }
      });

      //create template for email put query name and their total changes in same line
      const template = queryArray
        .map((query) => {
          return `<p>For the query <b>${query.queryName} </b>have been found ${query.totalChanges} changes </p><a href="${query.queryUrl} "><button style="${buttonStyle}">Link for query page</button></a>`;
        })
        .join('');

      //send email to user
      await mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: process.env.MJ_SENDER,
              Name: 'Recaplee Bot',
            },
            To: [
              {
                Email: profile.email,
              },
            ],
            Subject: 'Changes detected',
            HTMLPart: `<h3>Hi</h3> <p>Following changes have been detected:</p> ${template}`,
          },
        ],
      });
    });

    Promise.all(promises)
      .then(() => {
        // All promises have resolved successfully
        console.log('All promises resolved');
      })

      .catch((error) => {
        // Handle any errors that occurred during promise execution
        console.error('An error occurred:', error);
      });
    res.status(200).json({ message: 'Emails sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'hello error looll' });
  }
}
