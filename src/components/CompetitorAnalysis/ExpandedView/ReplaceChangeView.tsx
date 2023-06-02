import React from 'react';
import HeaderTagView from '@/components/CompetitorAnalysis/HeaderTagView';
import CopyButton from './CopyButton';
import { diff_match_patch } from 'diff-match-patch';
import { Change } from '@/types/my-types';
import wordsCount from 'words-count';
type Props = {
  tag: Change;
  index: number;
};

const ReplaceChangeView = ({ tag, index }: Props) => {
  const dmp = new diff_match_patch();

  const response = dmp.diff_main(tag?.value.__old, tag?.value.__new);

  dmp.diff_cleanupSemantic(response);

  let toBeCopiedRemovedString = '';
  let toBeCopiedAddedString = '';

  //map over response map and update to be coppied
  response.forEach((item, index) => {
    if (item[0] === 0) {
      toBeCopiedRemovedString += item[1];
      toBeCopiedAddedString += item[1];
    }
    if (item[0] === -1) {
      toBeCopiedRemovedString += item[1];
    }
    if (item[0] === 1) {
      toBeCopiedAddedString += item[1];
    }
  });

  return (
    <div key={index} className="flex  space-x-8 md:space-x-20">
      <div
        className={`  flex space-x-2 w-1/2 justify-between  rounded-[30px]  bg-white p-2   text-sm font-bold  `}
      >
        <div>
          <HeaderTagView tag={tag?.tag || ''} />
          {/* <HeaderTagView tag={tag?.tag || ''} /> */}
          {response?.map((item, index) => {
            if (item[0] === 0) {
              //span affecting padding how?
              return <span>{item[0] === 0 && <> {item[1]}</>}</span>;
            }
            if (item[0] == -1) {
              return <>{<span className="text-customRed"> {item[1]}</span>}</>;
            }
          })}
        </div>
          <div className="flex flex-col justify-between text-[9px] font-normal">
            <span className="flex justify-end">#{index + 1}</span>
            <div className="flex-col flex justify-end">
                
            <span className="flex justify-end">  <CopyButton text={toBeCopiedRemovedString} /></span>
              <span className='whitespace-nowrap flex justify-end' > {wordsCount(toBeCopiedRemovedString)} words</span>
            </div>
        </div>
      </div>
      <div
        className={`w-1/2 rounded-[30px] bg-white  p-2   pb-5 text-sm  font-bold `}
      >
        <div className=" flex justify-end text-customGray">
          {/* <div className=""> */}
          <CopyButton text={toBeCopiedAddedString} />
          <span className="text-customGray ">{index + 1}</span>
          {/* </div> */}
        </div>
        <HeaderTagView tag={tag?.tag || ''} />
        {response?.map((item, index) => {
          if (item[0] === 0) {
            //span affecting padding how?
            return <span>{item[0] === 0 && <> {item[1]}</>}</span>;
          }

          if (item[0] == 1) {
            return <>{<span className="text-green-500 "> {item[1]}</span>}</>;
          }
        })}
      </div>
    </div>
  );
};

export default ReplaceChangeView;
