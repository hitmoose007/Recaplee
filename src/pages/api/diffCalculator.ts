import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {
  parseObject,
  filterResponse,
} from '@/utils/apiHelper';
import { diff } from 'json-diff';

import { prisma } from '@/lib/prisma';

export default async function handler(
    req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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
