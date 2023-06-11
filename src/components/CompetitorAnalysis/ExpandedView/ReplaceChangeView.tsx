import React, { useEffect } from 'react';
import HeaderTagView from '@/components/CompetitorAnalysis/HeaderTagView';
import CopyButton from './CopyButton';
import { diff_match_patch } from 'diff-match-patch';
import { Change } from '@/types/my-types';
import wordsCount from 'words-count';
import AdditionalUtilitiesGroup from './AdditionalUtilitiesGroup';
type Props = {
  tag: Change;
  index: number;
  setAddedCopyAllTextHandler: (text: string) => void;
  setRemovedCopyAllTextHandler: (text: string) => void;
  hasRenderedRef: React.MutableRefObject<boolean>;
};

const ReplaceChangeView = ({
  tag,
  index,
  setAddedCopyAllTextHandler,
  setRemovedCopyAllTextHandler,
  hasRenderedRef,
}: Props) => {
  const dmp = new diff_match_patch();

  const response = dmp.diff_main(tag?.value.__old, tag?.value.__new);

  let addedText = '';
  let removedText = '';
  dmp.diff_cleanupSemantic(response);

  //   console.log('response', response);

  useEffect(() => {
    if (hasRenderedRef.current) {
      setAddedCopyAllTextHandler(addedText);
    }
  }, [addedText]);
  useEffect(() => {
    if (hasRenderedRef.current) {
      setRemovedCopyAllTextHandler(removedText);
      console.log('removedText', removedText);
    }
  }, [removedText]);

  return (
    <div key={index} className="flex  space-x-8 md:space-x-20">
      <div
        className={`  flex w-1/2 justify-between space-x-2 rounded-[30px]  bg-white  px-4 py-2   text-sm font-bold  `}
      >
        <div>
          <HeaderTagView tag={tag?.tag || ''} />
          {/* <HeaderTagView tag={tag?.tag || ''} /> */}
          {response?.map((item, index) => {
            if (item[0] === 0) {
              //span affecting padding how?

              //   console.log('item[1]', item[1]);
              removedText += item[1];

              return (
                <span key={index}>{item[0] === 0 && <> {item[1]}</>}</span>
              );
            }
            if (item[0] == -1) {
              removedText += item[1];
              return <>{<span className="text-customRed"> {item[1]}</span>}</>;
            }
          })}
        </div>
        <AdditionalUtilitiesGroup index={index} toBeCopiedText={removedText} />
      </div>
      <div
        className={`flex w-1/2 justify-between rounded-[30px] bg-white  px-4  py-2  text-sm  font-bold `}
      >
        <div>
          <HeaderTagView tag={tag?.tag || ''} />
          {response?.map((item, index) => {
            if (item[0] === 0) {
              addedText += item[1];
              //span affecting padding how?
              return (
                <span key={index}>{item[0] === 0 && <> {item[1]}</>}</span>
              );
            }

            if (item[0] == 1) {
              addedText += item[1];
              return <>{<span className="text-green-500 "> {item[1]}</span>}</>;
            }
          })}
        </div>

        <AdditionalUtilitiesGroup index={index} toBeCopiedText={addedText} />
      </div>
    </div>
  );
};

export default ReplaceChangeView;
