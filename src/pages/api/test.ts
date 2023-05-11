import type { NextApiRequest, NextApiResponse } from 'next';
import { diff_match_patch } from 'diff-match-patch';
import { diff } from 'json-diff';
import { filterResponse } from '@/utils/apiHelper';
import { parsedChanges1, parsedJson1, parsedJson2 } from '../../utils/test';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const dmp = new diff_match_patch();

    const response = diff(
      parsedJson1,
    parsedJson2 
    );

    console.log(filterResponse(response));

    
    // const response = dmp.diff_main()
    // dmp.diff_cleanupSemantic(response)
    res.status(200).json({ response }); // res.status(200).json({ name: 'John Doe' });
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
