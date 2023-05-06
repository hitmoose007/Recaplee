import React, { useState } from 'react';
import { parsedChanges1 } from '@/utils/test';

import { diff_match_patch } from 'diff-match-patch';
type Props = {
  isRemoved: boolean;
  removedRef: React.RefObject<HTMLDivElement>;
  notRemovedRef: React.RefObject<HTMLDivElement>;
};

const ExpandedCard = ({ isRemoved, removedRef, notRemovedRef }: Props) => {
  const dmp = new diff_match_patch();

  return (
    <div className="flex w-1/2 flex-col space-y-4 rounded-[30px] bg-customBlue md:px-4 md:py-4">
      {parsedChanges1.map((change, index) => {
        if (change[0] === '-') {
          const removedChange = printTagIfExists(change);
          return (
            <div
              key={index}
              className={` pointer-events-none rounded-[30px] bg-white  p-2    text-sm font-bold md:space-x-4 md:space-y-4 ${
                isRemoved ? 'text-red-500 ' : 'bg-[#E0E8F0]  '
              }}`}
            >
              <p className={`${!isRemoved && 'invisible'}`}>{removedChange}</p>
            </div>
          );
        }
        if (change[0] === '+') {
          return (
            <div
              key={index}
              className={` pointer-events-none rounded-[30px] bg-white  p-2    text-sm font-bold md:space-x-4 md:space-y-4 ${
                !isRemoved ? 'text-green-500 ' : 'bg-[#E0E8F0]  '
              }}`}
            >
              <p className={`${isRemoved && 'invisible'}`}>
                {printTagIfExists(change)}
              </p>
            </div>
          );
        }

        if (change[0] === '~') {
          //   console.log('hello');
          let response;
          const tag = printTagIfExists(change);
          response = dmp.diff_main(tag.__old, tag.__new);
          dmp.diff_cleanupSemantic(response);
          let height;
          if (removedRef && notRemovedRef) {
            console.log('heelo');
            console.log(removedRef.current?.offsetHeight);
          }
          return (
            <div
              ref={isRemoved ? removedRef : notRemovedRef}
              className={` pointer-events-none rounded-[30px] bg-white  p-2    text-sm font-bold   `}
            >
              {response?.map((item, index) => {
                if (item[0] === 0) {
                  //span affecting padding how?
                  return (
                      <span>{item[0] === 0 && <> {item[1]}</>}</span>
                  );
                }
                if (item[0] == -1) {
                  return (
                    <>
                      {isRemoved && (
                        <span className="text-red-500  "> {item[1]}</span>
                      )}
                    </>
                  );
                }
                if (item[0] == 1) {
                  return (
                    <>
                      {!isRemoved && (
                        <span className="text-green-500 "> {item[1]}</span>
                      )}
                    </>
                  );
                }
              })}
            </div>
          );
        }
      })}
    </div>
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
export default ExpandedCard;
