import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { array3, array4 } from '../../utils/test';
//create prisma client
import { PrismaClient } from '@prisma/client';
import { diff, diffString } from 'json-diff';

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentDate = new Date();
    // const parsedJson1 = parseObject(array3);
    // const parsedJson2 = parseObject(array4);

    //prisma query to get the task

    const allQueries = await prisma.targetQuery.findMany({});

    //filter out using dates that are more than 3 days old
    const queryDate = new Date().getTime();
    const tutti = allQueries[0]?.recent_update?.getTime();

    const filteredQueries = allQueries.filter((query) => {
      const queryTime = query.recent_update?.getTime();

      if (queryTime !== undefined) {
        const diffDays = Math.floor(
          (currentDate.getTime() - queryTime) / (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 1) {
          return query;
        }
      }
    });

    const competitors = await prisma.competitor.findMany({
      where: {
        query_id: {
          in: filteredQueries.map((query) => query.id),
        },
      },
    });

    
    // console.log(filteredQueries);
    // const filteredQueries = allQueries.filter((query) => {
    //     const queryDate = new Date(query.recent_update);

    // let response = diff(parsedJson1, parsedJson2);

    // response = filterResponse(response);

    // let task_post_array = [];
    // task_post_array.push({
    //   target: 'https://www.fujielectric.com/',
    //   //   id: '04242333-2720-0216-0000-fef73e36d19e',
    //   max_crawl_pages: 10,
    //   enable_content_parsing: true,
    // });

    // const content_post_array = [];
    // content_post_array.push({
    //   url: 'https://www.fujielectric.com/',
    //   //   id: task_response[0].id,
    //   // id : '04292211-2720-0216-0000-78d80b859a12'
    // });
    // const response = await axios({
    //   method: 'post',
    //   url: 'https://api.dataforseo.com/v3/on_page/content_parsing/live',
    //   auth: {
    //     username: 'admin@comprasocial.me',
    //     password: '45b462e774105e74',
    //   },
    //   data: content_post_array,
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    //   .then(function (content_response) {
    //     var result = content_response['data']['tasks'];
    //     // Result data
    //     return result;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // console.log(response[0].result[0].items[0].page_content);

    res.status(200).json({
      // response: response[0].result[0].items[0].page_content.secondary_topic,
      //   tasks_ready: tasks_ready,
      //   content_response: content_response,
      competitors,
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

function filterResponse(response: any) {
  const filteredResponse = response.filter((item: any) => {
    return item[0] !== ' ';
  });
  return filteredResponse;

  // Loop through the words in the first string
}

function parseObject(jsonObject: any) {
  let outputArray = [];

  // iterate through the input array
  for (let i = 0; i < jsonObject.length; i++) {
    const item = jsonObject[i];

    // check the level of the item and assign the appropriate heading tag
    let tag;
    switch (item.level) {
      case 1:
        tag = 'h1';
        break;
      case 2:
        tag = 'h2';
        break;
      case 3:
        tag = 'h3';
        break;
      case 4:
        tag = 'h4';
        break;
      case 5:
        tag = 'h5';
        break;
      case 6:
        tag = 'h6';
        break;
      default:
        // if level is not specified, default to h1
        tag = 'h1';
    }

    // if the item has primary_content, concatenate all text fields
    let primaryContent = '';
    if (item.primary_content) {
      for (let j = 0; j < item.primary_content.length; j++) {
        const contentItem = item.primary_content[j];
        primaryContent += contentItem.text + ' ';
      }
    }

    // if the item has secondary_content, concatenate all text fields
    let secondaryContent = '';
    if (item.secondary_content) {
      for (let j = 0; j < item.secondary_content.length; j++) {
        const contentItem = item.secondary_content[j];
        secondaryContent += contentItem.text + ' ';
      }
    }

    // create a new object with the appropriate tag and content
    const outputItem1 = {
      [tag]: item.h_title || '',
    };

    outputArray.push(outputItem1);
    let outputItem2 = {};
    if (primaryContent) {
      console.log(primaryContent);
      outputItem2 = {
        p: primaryContent.trim() || '',
      };
      outputArray.push(outputItem2);
    }

    let outputItem3 = {};
    if (secondaryContent) {
      outputItem3 = {
        p: secondaryContent.trim() || '',
      };

      outputArray.push(outputItem3);
    }
    // add the output object to the output array
  }

  return outputArray;
}

function sleep(ms: number) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < ms) {}
}
