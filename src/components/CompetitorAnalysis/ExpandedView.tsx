import React, { useEffect, useState } from 'react';
import { parsedChanges1 } from '@/utils/test';

import { diff_match_patch } from 'diff-match-patch';
import HeaderTagView from './HeaderTagView';
import { Competitor, QuerySummary } from '@/types/my-types';
type Props = {
  competitorAnalysed: Competitor;
  querySummary: QuerySummary;
};

const ExpandedView = ({ competitorAnalysed, querySummary }: Props) => {
  const dmp = new diff_match_patch();
  //   const [parsedChanges, setParsedChanges] = useState<string[][]>([]);
  return (
    <>
      <div className="flex w-full flex-col space-y-4 rounded-[30px] bg-customBlue text-sm md:px-4 md:py-20">
        {competitorAnalysed.changed_content?.map((change, index) => {
          if (change[0] === '-') {
            const removedChange = printTagIfExists(change);
            return (
              <div key={index} className="flex space-x-20">
                <div
                  className={`pointer-events-none w-full rounded-[30px] bg-white  p-2    text-sm font-bold text-customRed md:space-x-4  md:space-y-4 `}
                >
                  <p>
                    <HeaderTagView tag={removedChange?.tag || ''} />
                    {removedChange?.value}
                  </p>
                </div>
                <div
                  className={` pointer-events-none w-full rounded-[30px]  bg-[#E0E8F0]   p-2 text-sm font-bold md:space-x-4  md:space-y-4 `}
                >
                  <p className={'invisible'}>{removedChange?.value}</p>
                </div>
              </div>
            );
          }
          if (change[0] === '+') {
            const removedChange = printTagIfExists(change);
            return (
              <div key={index} className="flex space-x-20">
                <div
                  className={` pointer-events-none  w-full rounded-[30px] bg-[#E0E8F0]  p-2    text-sm font-bold  md:space-x-4  md:space-y-4 `}
                >
                  <p className={'invisible'}>{removedChange?.value}</p>
                </div>
                <div
                  className={` pointer-events-none w-full rounded-[30px] bg-white  p-2    text-sm font-bold text-customGreen md:space-x-4  md:space-y-4 `}
                >
                  <p>
                    <HeaderTagView tag={removedChange?.tag || ''} />
                    {removedChange?.value}
                  </p>
                </div>
              </div>
            );
          }

          if (change[0] === '~') {
            //   console.log('hello');
            let response;
            const tag = printTagIfExists(change);
            if (!tag) {
              console.log('teri maa tag');
              return null;
            }

            response = dmp.diff_main(tag?.value.__old, tag?.value.__new);

            dmp.diff_cleanupSemantic(response);
            return (
              <div key={index} className="flex space-x-20">
                <div
                  className={` pointer-events-none w-1/2 rounded-[30px] bg-white  p-2    text-sm font-bold   `}
                >
                  <HeaderTagView tag={tag?.tag || ''} />
                  {/* <HeaderTagView tag={tag?.tag || ''} /> */}
                  {response?.map((item, index) => {
                    if (item[0] === 0) {
                      //span affecting padding how?
                      return <span>{item[0] === 0 && <> {item[1]}</>}</span>;
                    }
                    if (item[0] == -1) {
                      return (
                        <>
                          {<span className="text-customRed"> {item[1]}</span>}
                        </>
                      );
                    }
                  })}
                </div>
                <div
                  className={`pointer-events-none w-1/2 rounded-[30px] bg-white  p-2    text-sm font-bold   `}
                >
                  <HeaderTagView tag={tag?.tag || ''} />
                  {response?.map((item, index) => {
                    if (item[0] === 0) {
                      //span affecting padding how?
                      return <span>{item[0] === 0 && <> {item[1]}</>}</span>;
                    }

                    if (item[0] == 1) {
                      return (
                        <>
                          {<span className="text-green-500 "> {item[1]}</span>}
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

function printTagIfExists(change: any) {
  const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
  const tag = Object.keys(change[1] || {}).find((key) =>
    allowedTags.includes(key.toLowerCase())
  );

  if (tag) {
    return { tag: tag, value: change[1][tag] };
  }
  return null;
}

// To use the function:
export default ExpandedView;
