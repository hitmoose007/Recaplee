import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { array3, array4 } from '../../utils/test';

// import { prisma } from '../../lib/db';
import { diff, diffString } from 'json-diff';
// import { diffArrays, diffJson, diffWords } from 'diff';

//todo list for this file
//1. get previous content json for all the pages
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const parsedJson1 = parseObject(array3);
    const parsedJson2 = parseObject(array4);

    let response = diff(parsedJson1, parsedJson2);

    response = filterResponse(response);

    // let task_post_array = [];
    // task_post_array.push({
    //   target: 'https://www.fujielectric.com/',
    //   //   id: '04242333-2720-0216-0000-fef73e36d19e',
    //   max_crawl_pages: 10,
    //   enable_content_parsing: true,
    // });
    // const task_response = await axios({
    //   method: 'post',
    //   url: 'https://api.dataforseo.com/v3/on_page/task_post',
    //   auth: {
    //     username: 'admin@comprasocial.me',
    //     password: '45b462e774105e74',
    //   },
    //   data: task_post_array,
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    //   .then(function (task_response) {
    //     var result = task_response['data']['tasks'];
    //     // Result data
    //     return result;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // const content_post_array = [];
    // // const response = getDiff(json1, json2);
    // // console.log(response);
    // console.log(task_response);
    // // sleep(20000);
    // content_post_array.push({
    //   url: 'https://www.fujielectric.com/',
    // //   id: task_response[0].id,
    //   id: '04292217-2720-0216-0000-7698cdeeadb3'
    //   // id : '04292211-2720-0216-0000-78d80b859a12'
    // });
    // const content_response = await axios({
    //   method: 'post',
    //   url: 'https://api.dataforseo.com/v3/on_page/content_parsing',
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

    // const tasks_ready = await axios({
    //   method: 'get',
    //   url: 'https://api.dataforseo.com/v3/on_page/tasks_ready',
    //   auth: {
    //     username: 'admin@comprasocial.me',
    //     password: '45b462e774105e74',
    //   },
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    //   .then(function (response) {
    //     var result = response['data']['tasks'][0]['result'];
    //     // Result data
    //     return result;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    //   console.log(tasks_ready);
    //   console.log(response['result']);

    // console.log(response[0].result[0].items[0].page_content);
    // // const json =await  result.json()
    // //   const response = result.data.tasks[0].result
    // // console.log(response);
    // // console.log(req.body);

    res.status(200).json({
      // response: response[0].result[0].items[0].page_content.secondary_topic,
    //   tasks_ready: tasks_ready,
    //   content_response: content_response,
    response
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
