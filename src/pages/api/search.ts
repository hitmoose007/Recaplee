import type { NextApiRequest, NextApiResponse } from 'next';
import { maxPage, maxResults } from '@/utils/apiHelper';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = {
    api_key: process.env.NEXT_PUBLIC_VALUESERP_KEY,
    q: req.body['query'],
    max_page: maxPage,
    google_domain: req.body['countryDomain'],
    gl: req.body['country'].toLowerCase(),
    device: req.body['isPC'] === true ? 'desktop' : 'mobile',
  };

  try {
    const response = await axios.get('https://api.valueserp.com/search', {
      params,
    });

    console.log(response.status)
    // console.log('teri maa ki chut')
    // print the JSON response from VALUE SERP

    const topResults = response.data.organic_results.slice(0, maxResults);

    res.status(200).json(topResults);
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
