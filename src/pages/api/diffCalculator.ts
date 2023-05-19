import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {
  parseObject,
  maxPage,
  maxResults,
  filterResponse,
} from '@/utils/apiHelper';
import { PrismaClient, Prisma } from '@prisma/client';
import { diff } from 'json-diff';
const prisma = new PrismaClient();
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

    const topResultsArray = await Promise.all(
      filteredQueries.map(async (query, index) => {
        const params = {
          api_key: process.env.NEXT_PUBLIC_VALUESERP_KEY,
          q: query.query_name,
          max_page: maxPage,
          google_domain: query.google_domain?.toLocaleLowerCase(),
          gl: query.country?.toLocaleLowerCase(),
          device: query.is_pc === true ? 'desktop' : 'mobile',
        };

        let response;
        try {
          response = await axios.get('https://api.valueserp.com/search', {
            params,
          });
        } catch (error) {
          // console.log(error)
          return [null];
        }
        // print the JSON response from VALUE SERP
        const topResults = response?.data.organic_results.slice(0, maxResults);
        competitors.map(async (competitor, index) => {
          if (competitor.query_id === query.id) {
            let isChanged = false;
            // console.log("found matching query")
            competitor.last_position = competitor.current_position;
            console.log(competitor.last_position, 'last position');
            topResults.forEach((result: any) => {
              if (result.link === competitor.link) {
                competitor.current_position = result.position_overall;
                isChanged = true;
                return;
              }
            });
            if (isChanged === false) {
              competitor.current_position = 10;
            }
          }
        });

        return topResults;
      })
    );

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

    const filteredContentArray = changedContentArray.map((item, index) => {
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
    const tasks_ready = await Promise.all(
      filteredQueries.map(async (query) => {
        const updatedQuery = await prisma.targetQuery.update({
          where: {
            id: query.id,
          },
          data: {
            recent_update: currentDate,
          },
        });
        return updatedQuery;
      })
    );

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
