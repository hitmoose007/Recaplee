import Mailjet from 'node-mailjet';

import { prisma } from '@/lib/prisma';

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || 'your-api-key',
  apiSecret: process.env.MJ_APIKEY_PRIVATE || 'your-api-secret',
});

const buttonStyle =
  'padding: 5px 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor:pointer;';
interface QueryType {
  id: string;
  queryName: string;
  queryUrl: string;
  totalChanges: number;
}

export async function mailSender() {
  const currentDate = new Date();

  const profiles = await prisma.profiles.findMany({
    where: {
      email_enabled: true,
      renewal_date: {
        gte: currentDate,
      },
    },
    include: {
      TargetQuery: {
        include: {
          Competitor: true,
        },
      },
    },
  });

  const promises = profiles.map(async (profile) => {
    //collect changes for each query and send email to user

    const queryArray: QueryType[] = [];
    const updateQueries: Promise<any>[] = [];

    profile.TargetQuery.map((query, index) => {
      const totalChanges = query.Competitor.reduce(
        (prev, competitor) => (prev += competitor.changes_detected || 0),
        0
      );

      if (totalChanges > 0) {
        queryArray.push({
          id: query.id,
          queryName: query.query_name || 'No query name',
          totalChanges,
          queryUrl:
            process.env.NEXT_PUBLIC_BASE_URL + '/querySummary/' + query.id,
        });

        updateQueries.push(
          prisma.targetQuery.update({
            where: {
              id: query.id,
            },
            data: {
              new_changes: totalChanges,
            },
          })
        );
      }
    });

    await Promise.all(updateQueries);
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
      console.log('All promises resolved');
    })

    .catch((error) => {
      console.error('An error occurred:', error);
    });
}
