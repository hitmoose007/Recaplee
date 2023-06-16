import { useState, useRef } from 'react';
import { Competitor, QuerySummary } from '@/types/my-types';
import AddedChangeView from './UnExpandedAdded';
import RemovedChangeView from './UnExpandedRemoved';
import ReplaceChangeView from './UnExpandedReplace';
import ExpandedBanner from './ExpandedBanner';
import { useEffect } from 'react';
type Props = {
  competitorAnalysed: Competitor;
  querySummary: QuerySummary;
};

const ExpandedView = ({ competitorAnalysed, querySummary }: Props) => {
  //   const [parsedChanges, setParsedChanges] = useState<string[][]>([]);
  const hasRenderedRef = useRef(false);
  const [removedCopyAllText, setRemovedCopyAllText] = useState<string>('');
  const [addedCopyAllText, setAddedCopyAllText] = useState<string>('');
  const setRemovedCopyAllTextHandler = (text: string) => {
    //add it incrementally
    setRemovedCopyAllText((prev) => prev + text);
  };
  const setAddedCopyAllTextHandler = (text: string) => {
    setAddedCopyAllText((prev) => prev + text);
  };

  useEffect(() => {
    hasRenderedRef.current = true;
  }, []);
//   console.log('competitorAnalysed', competitorAnalysed);

  let i = 0;
  let j = 0;
  return (
    <>
      <div className="flex w-full flex-col space-y-4 rounded-[30px] bg-customBlue px-4 py-4 text-sm ">
        <ExpandedBanner
          querySummary={querySummary}
          competitorAnalysed={competitorAnalysed}
          removedCopyAllText={removedCopyAllText}
          addedCopyAllText={addedCopyAllText}
        />

        <div className="flex w-full  space-x-20 ">
          <div className="w-1/2  space-y-4">
            {competitorAnalysed.changed_content?.filter((change)=> change[0]==='-' || change[0] ==='~').map((change, index) => {
              if (change[0] === '-') {
                const removedChange = printTagIfExists(change);
                return (
                  <RemovedChangeView
                    hasRenderedRef={hasRenderedRef}
                    setRemovedCopyAllTextHandler={setRemovedCopyAllTextHandler}
                    key={index}
                    index={index}
                    removedChange={removedChange}
                  />
                );
              }

              if (change[0] === '~') {
                // let response
                const tag = printTagIfExists(change);

                if (!tag) {
                  return null;
                }
                // i++;
                return (
                  <ReplaceChangeView
                    isRemoved={true}
                    isAdded={false}
                    hasRenderedRef={hasRenderedRef}
                    setRemovedCopyAllTextHandler={setRemovedCopyAllTextHandler}
                    setAddedCopyAllTextHandler={setAddedCopyAllTextHandler}
                    key={index}
                    index={index}
                    tag={tag}
                  />
                );
              }
              return null;
            })}
          </div>
          <div className="w-1/2 space-y-4 ">
            {competitorAnalysed.changed_content?.filter((change)=> change[0]==='+' || change[0] ==='~').map((change, index) => {
              if (change[0] === '+') {
                const addedChange = printTagIfExists(change);
                // newContentWords += wordsCount(addedChange?.value);
                // setAddedCopyAllTextHandler(addedChange?.value);
                j++;
                return (
                  <AddedChangeView
                    setAddedCopyAllTextHandler={setAddedCopyAllTextHandler}
                    hasRenderedRef={hasRenderedRef}
                    key={index}
                    index={index}
                    AddedChange={addedChange}
                  />
                );
              }

              if (change[0] === '~') {
                // let response
                const tag = printTagIfExists(change);
                if (!tag) {
                  return null;
                }
                j++;
                return (
                  <ReplaceChangeView
                    isRemoved={false}
                    isAdded={true}
                    setAddedCopyAllTextHandler={setAddedCopyAllTextHandler}
                    setRemovedCopyAllTextHandler={setRemovedCopyAllTextHandler}
                    hasRenderedRef={hasRenderedRef}
                    key={index}
                    index={index}
                    tag={tag}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

//make react component

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
