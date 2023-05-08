import React, { useState } from 'react';
import { parsedChanges1 } from '@/utils/test';

import { diff_match_patch } from 'diff-match-patch';
type Props = {};

const TestBanner = ({}: Props) => {
  const dmp = new diff_match_patch();

  return (
    <>
        <div className="flex w-full flex-col space-y-4 rounded-[30px] bg-customBlue md:px-4 md:py-20">
          {parsedChanges1.map((change, index) => {
            if (change[0] === '-') {
              const removedChange = printTagIfExists(change);
              return (
                <div className="flex space-x-20">
                  <div
                    key={index}
                    className={` pointer-events-none rounded-[30px] bg-white  p-2    text-sm font-bold text-customRed md:space-x-4  md:space-y-4 `}
                  >
                    <p>{removedChange}</p>
                  </div>
                  <div
                    key={index}
                    className={` text-customG pointer-events-none rounded-[30px]  bg-[#E0E8F0]   p-2 text-sm font-bold md:space-x-4  md:space-y-4 `}
                  >
                    <p className={'invisible'}>{removedChange}</p>
                  </div>
                </div>
              );
            }
            if (change[0] === '+') {
              const removedChange = printTagIfExists(change);
              return (
                <div className="flex space-x-20">
                  <div
                    key={index}
                    className={` pointer-events-none rounded-[30px] bg-[#E0E8F0]  p-2    text-sm font-bold  md:space-x-4  md:space-y-4 `}
                  >
                    <p className={'invisible'}>{removedChange}</p>
                  </div>
                  <div
                    key={index}
                    className={` pointer-events-none rounded-[30px] bg-white  p-2    text-sm font-bold text-customGreen md:space-x-4  md:space-y-4 `}
                  >
                    <p>{removedChange}</p>
                  </div>
                </div>
              );
            }

         

            if (change[0] === '~') {
              //   console.log('hello');
              let response;
              const tag = printTagIfExists(change);
              response = dmp.diff_main(tag.__old, tag.__new);
              dmp.diff_cleanupSemantic(response);
              return (
                <div className="flex space-x-20">
                  <div
                    className={` pointer-events-none w-1/2 rounded-[30px] bg-white  p-2    text-sm font-bold   `}
                  >
                    {response?.map((item, index) => {
                      if (item[0] === 0) {
                        //span affecting padding how?
                        return <span>{item[0] === 0 && <> {item[1]}</>}</span>;
                      }
                      if (item[0] == -1) {
                        return (
                          <>
                            {<span className="text-red-500  "> {item[1]}</span>}
                          </>
                        );
                      }
                    })}
                  </div>
                  <div
                    className={`pointer-events-none w-1/2 rounded-[30px] bg-white  p-2    text-sm font-bold   `}
                  >
                    {response?.map((item, index) => {
                      if (item[0] === 0) {
                        //span affecting padding how?
                        return <span>{item[0] === 0 && <> {item[1]}</>}</span>;
                      }

                      if (item[0] == 1) {
                        return (
                          <>
                            {
                              <span className="text-green-500 ">
                                {' '}
                                {item[1]}
                              </span>
                            }
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
    return change[1][tag];
  }
  return null;
}



// To use the function:
export default TestBanner;
