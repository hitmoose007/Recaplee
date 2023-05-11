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

      if (queryTime !== undefined) {
        const diffDays = Math.floor(
          (currentDate.getTime() - queryTime) / (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 0) {
          return query;
        }
      }
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
          gl: query.country?.toLocaleLowerCase,
          device: query.is_pc === true ? 'desktop' : 'mobile',
        };

        let response;
        try {
          response = await axios.get('https://api.valueserp.com/search', {
            params,
          });
        } catch (error) {
          return [null];
        }
        // print the JSON response from VALUE SERP
        const topResults = response?.data.organic_results.slice(0, maxResults);
        // console.log('heelo')
        // console.log('heelo');
        competitors.map(async (competitor, index) => {
          if (competitor.query_id === query.id) {
            competitor.last_position = competitor.current_position;
            //check if competitor.link in  top results
            topResults.forEach((result: any) => {
              if (result.link === competitor.link) {
                // console.log(competitor.domain);
                // console.log(result.position_overall, 'overall ppoopy');
                competitor.current_position = result.position_overall;
              }
            });
          }
        });

        return topResults;
      })
    );

    // console.log(competitors.length, 'length');
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
    // console.log('first tutti');
    changedContentArray.forEach((item, index) => {
      //   console.log(index, item?.[0]?.data.url);
    });

    // console.log('later tutti');
    competitors.forEach((competitor, index) => {
      //   console.log(index, competitor.link);
    });

    // console.log('eh')
    // console.log(changedContentArray, 'changedContentArray')
    const currentContentArray: Prisma.NullableJsonNullValueInput[] = [];

    const filteredContentArray = changedContentArray.map((item, index) => {
      const parsedContent = parseObject(
        item?.[0]?.result?.[0]?.items?.[0]?.page_content?.main_topic
      );
      if (parsedContent === null) {
        // console.log(index, 'index')
        // console.log(changedContentArray[index]?.[0]?.data.url)
        // console.log(item?.[0]?.result?.[0]?.items?.[0]?.page_content?.main_topic)
        // console.log('oh no ');
        // console.log(parsedContent);
        return [];
      }

      currentContentArray.push(filterResponse(parsedContent));
      return filterResponse(parsedContent);
    });
    // console.log('hello')
    // console.log(filteredContentArray, 'meri maa idhr dekhu')
    // console.log(filteredContentArray[0], 'meri maa idhr dekhu')
    // console.log(competitors[0]?.current_content, 'teri maa idhr dekhu')
    // console.log(filteredContentArray.length, 'filteredContentArray');

    //do a diff on the content and return the diff
    const diffArray: Prisma.NullableJsonNullValueInput[] = [];
    const changesCountArray: number[] = [];
    const percentageChangedContentArray: number[] = [];
    let poopy;
    let poop2;
    let poop3;
    for (let i = 0; i < filteredContentArray.length; i++) {
      if (competitors[i]?.link === 'https://www.britannica.com/animal/fish') {
        console.log(filteredContentArray[i], 'filteredContentArray[i]');
        poopy = filteredContentArray[i];
        poop2 = competitors[i]?.current_content;
        console.log(
          competitors[i]?.current_content,
          'competitors[i]?.current_content'
        );
      }
      const diffObject = filterResponse(
        diff(filteredContentArray[i], competitors[i]?.current_content)
      );

      diffArray.push(diffObject);
      // console.log('peechay')
      if (diffObject !== undefined && diffObject !== null) {
        const changesCount = Object.keys(diffObject).length;
        changesCountArray.push(changesCount);

        //   console.log('hey')
        if (
          competitors[i]?.current_content !== null &&
          Array.isArray(competitors?.[i]?.changed_content)
        ) {
          //   const percentageChangedContent =
          //     (diffArray[i].length / competitors[i].current_content.length) * 100;
          const percentageChangedContent = 0;
          percentageChangedContentArray.push(
            Math.round(percentageChangedContent)
          );
          //   console.log('teri amma');
        } else {
          const percentageChangedContent = 0;
          percentageChangedContentArray.push(percentageChangedContent);
        }
      } else {
        changesCountArray.push(0);
        percentageChangedContentArray.push(0);
      }
    }

    // console.log('this is the diff array', diffArray, 'diffArray[0]')
    // console.log(diffArray.length, 'diffArray');
    //update the changed content in the database using promise.all
    const content_response = await Promise.all(
      competitors.map(async (competitor, index) => {
        // console.log(competitor.current_content, 'competitor.current_content');
        // console.log(currentContentArray[index], 'currentContentArray[index]');
        const updatedCompetitor = await prisma.competitor.update({
          where: {
            id: competitor.id,
          },
          data: {
            changed_content:
              diffArray[index] === undefined || null ? [] : diffArray[index],
            current_content: currentContentArray[index],
            changes_detected: changesCountArray[index],
            // content_changed: percentageChangedContentArray[index],
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
      // response: response[0].result[0].items[0].page_content.secondary_topic,
      //   tasks_ready: tasks_ready,
      //   content_response: content_response,
      //   content_response,
      poopy,
      poop2,
      poop3,
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
