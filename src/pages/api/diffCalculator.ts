import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getDiff } from 'json-difference';
import { array3, array4, parsedJson1, parsedJson2 } from '../../utils/test';

import similarity from 'similarity';
// import { prisma } from '../../lib/db';
import { diff, diffString } from 'json-diff';
import { diffArrays, diffJson, diffWords } from 'diff';
const json1 = {
  chicken: 'chicken',
  'Aidan Gillen': {
    array: ['Game of Thrones', 'The Wire'],
    string: 'some string',
    int: 2,
    aboolean: true,
    boolean: true,
    object: {
      foo: 'bar',
      object1: { 'new prop1': 'new prop value' },
      object2: { 'new prop1': 'new prop value' },
      object3: { 'new prop1': 'new prop value' },
      object4: { 'new prop1': 'new prop value' },
    },
  },
  'Amy Ryan': { one: 'In Treatment', two: 'The Wire' },
  'Annie Fitzgerald': ['Big Love', 'True Blood'],
  'Anwan Glover': ['Treme', 'The Wire'],
  'Alexander Skarsgard': ['Generation Kill', 'True Blood'],
  'Clarke Peters': null,
};

const json2 = {
  chicken: 'chicken',
  'Aidan Gillen': {
    array: ['Game of Thrones', 'The Wire'],
    string: 'some string',
    int: '2',
    otherint: 4,
    aboolean: 'true',
    boolean: false,
    object: { foo: 'bar' },
  },
  'Amy Ryan': ['In Treatment', 'The Wire'],
  'Annie Fitzgerald': ['True Blood', 'Big Love', 'The Sopranos', 'Oz'],
  'Anwan Glover': ['Treme', 'The Wire'],
  'Alexander Skarsg?rd': ['Generation Kill', 'True Blood'],
  'Alice Farmer': ['The Corner', 'Oz', 'The Wire'],
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const response = differ.diff(json1, json2);

    let response = diff(parsedJson1, parsedJson2);

    response = filterResponse(response);

    // let response = combinedparsedJson2;
    //fiter response
    // console.log(response);

    // const response = parseObject(array4);

    // const response = diff(json1, json2);
    // console.log(diff({ foo: 'bar' }, { foo: 'baz' }));
    // const differ = new Differ({
    //   detectCircular: true, // default `true`
    //   maxDepth: Infinity, // default `Infinity`
    //   showModifications: true, // default `true`
    //   arrayDiffMethod: 'lcs', // default `"normal"`, but `"lcs"` may be more useful
    // });

    // const post_array = [];
    // const response = getDiff(json1, json2);
    // console.log(response);
    // post_array.push({
    //   target: 'https://www.fujielectric.com/',
    //   //   id: '04242333-2720-0216-0000-fef73e36d19e',
    //   max_crawl_pages: 10,
    //       enable_content_parsing: true,
    // });
    // const response= await axios({
    //   method: 'post',
    //   url: 'https://api.dataforseo.com/v3/on_page/task_post',
    //   auth: {
    //     username: 'admin@comprasocial.me',
    //     password: '45b462e774105e74',
    //   },
    //   data: post_array,
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    //   .then(function (response) {
    //     var result = response['data']['tasks'];
    //     // Result data
    //     return result;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // const post_array = [];
    // // const response = getDiff(json1, json2);
    // // console.log(response);
    // post_array.push({
    //   url: 'https://www.fujielectric.com/',
    //   id: '04271730-2720-0216-0000-186f185f1851',
    // });
    // const response = await axios({
    //   method: 'post',
    //   url: 'https://api.dataforseo.com/v3/on_page/content_parsing',
    //   auth: {
    //     username: 'admin@comprasocial.me',
    //     password: '45b462e774105e74',
    //   },
    //   data: post_array,
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    //   .then(function (response) {
    //     var result = response['data']['tasks'];
    //     // Result data
    //     return result;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // //   console.log(response['result']);

    // console.log(response[0].result[0].items[0].page_content);
    // // const json =await  result.json()
    // //   const response = result.data.tasks[0].result
    // // console.log(response);
    // // console.log(req.body);

    res.status(200).json({
      // response: response[0].result[0].items[0].page_content.secondary_topic,
      response,
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
  let newResponse = response.response;
  //   console.log(newResponse);
  const filteredResponse = newResponse.filter((item: any) => {
    return item[0] !== ' ';
  });

  const newMappedResponse = filteredResponse.map((item: any) => {
    if (item[0] === '~') {
      let newItem =
        item[1].h1 ||
        item[1].h2 ||
        item[1].h3 ||
        item[1].h4 ||
        item[1].h5 ||
        item[1].h6 ||
        item[1].p;
      let old = newItem.__old;
      let neww = newItem.__new;

      const words1 = old.split(' ');
      const words2 = neww.split(' ');

      // Loop through the words in the first string
      for (let i = 0; i < words1.length; i++) {
        const word = words1[i];

        // Check if the second string includes the word
        if (words2.includes(word)) {
          console.log(`The word "${word}" appears in both strings`);
          break;
        }
      }

      console.log(similarity(old, neww));
    }
  });
  return filteredResponse;
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
      //   p: secondaryContent.trim() || '',
    };

    outputArray.push(outputItem1);
    console.log(outputItem1);
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
