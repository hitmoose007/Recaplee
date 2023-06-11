import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Mailjet from 'node-mailjet';
import { parseObject, filterResponse } from '@/utils/apiHelper';
import { diff } from 'json-diff';

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
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //check for secret key for cron job in headers
    const secretKey = req.headers['secret-key'];
    if (secretKey !== process.env.SECRET_KEY) {
      res
        .status(403)
        .json({ error: 'You are not authorized to perform this action' });
      return;
    }

    const currentDate = new Date();

    const allQueries = await prisma.targetQuery.findMany({});

    const filteredQueries = allQueries.filter((query) => {
      const queryTime = query.recent_update?.getTime();

      if (queryTime !== undefined && queryTime !== null) {
        const diffDays = Math.floor(
          (currentDate.getTime() - queryTime) / (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 0) {
          return query;
        }
      }

      //needs to be tested
      return query;
    });

    // use promise .all
    // console.log('hello')
    let competitors = await prisma.competitor.findMany({
      where: {
        query_id: {
          in: filteredQueries.map((query) => query.id),
        },
      },
    });

    const changedContentArray = await Promise.all(
      competitors.map(async (competitor) => {
        const post_array = [];
        post_array.push({
          url: competitor.link,
        });
        try {
          const response = await axios({
            method: 'post',
            url: 'https://api.dataforseo.com/v3/on_page/content_parsing/live',
            auth: {
              username: 'admin@comprasocial.me',
              password: '45b462e774105e74',
            },
            data: post_array,
            headers: {
              'content-type': 'application/json',
            },
          });
          const result = response['data']['tasks'];

          return result;
        } catch (error) {
          console.log(error);
          return []; // or handle the error in an appropriate way
        }
      })
    );

    const currentContentArray: any[] = [];

    const filteredContentArray = changedContentArray.map((item) => {
      const parsedContent = parseObject(
        item?.[0]?.result?.[0]?.items?.[0]?.page_content?.main_topic
      );
      if (parsedContent === null) {
        return [];
      }

      currentContentArray.push(filterResponse(parsedContent));
      return filterResponse(parsedContent);
    });
    // console.log('hello')

    const diffArray: any[] = [];
    const changesCountArray: number[] = [];
    const percentageChangedContentArray: number[] = [];

    for (let i = 0; i < filteredContentArray.length; i++) {
      const diffObject = filterResponse(
        diff(filteredContentArray[i], competitors[i]?.current_content)
      );

      diffArray.push(diffObject);
      if (diffObject !== undefined && diffObject !== null) {
        const changesCount = Object.keys(diffObject).length;
        changesCountArray.push(changesCount);

        const diffLength = diffArray[i]?.length ?? 0;

        const currentContent = competitors[i]?.current_content;

        // Check if currentContent is an array
        const currentContentLength = Array.isArray(currentContent)
          ? currentContent.length
          : 0;

        const percentageChangedContent =
          (diffLength / currentContentLength) * 100;

        // const percentageChangedContent = 0;
        percentageChangedContentArray.push(
          Math.round(percentageChangedContent)
        );
      } else {
        changesCountArray.push(0);
        percentageChangedContentArray.push(0);
      }
    }

    const content_response = await Promise.all(
      competitors.map(async (competitor, index) => {
        const updatedCompetitor = await prisma.competitor.update({
          where: {
            id: competitor.id,
          },
          data: {
            changed_content:
              diffArray[index] === undefined || null ? [] : diffArray[index],
            current_content: currentContentArray[index],
            old_content: competitor.current_content || {},
            changes_detected: changesCountArray[index],
            content_changed: Number.isInteger(
              percentageChangedContentArray[index]
            )
              ? percentageChangedContentArray[index]
              : 0,
            current_position: competitor.current_position,
            last_position: competitor.last_position,
          },
        });
        return updatedCompetitor;
      })
    );

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

    //update the filtered queries time stamp

    res.status(200).json({
      content_response,
    });
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
