import { useState, useRef } from 'react';
import { Competitor, QuerySummary } from '@/types/my-types';
import AddedChangeView from './AddedChangeView';
import RemovedChangeView from './RemovedChangeView';
import ReplaceChangeView from './ReplaceChangeView';
import ExpandedBanner from './ExpandedBanner';
import wordsCount from 'words-count';
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

  return (
    <>
      <div className="flex w-full flex-col space-y-4 rounded-[30px] bg-customBlue px-4 py-4 text-sm ">
        <ExpandedBanner
          querySummary={querySummary}
          competitorAnalysed={competitorAnalysed}
          removedCopyAllText={removedCopyAllText}
          addedCopyAllText={addedCopyAllText}
        />

        {competitorAnalysed.changed_content?.map((change, index) => {
          if (change[0] === '-') {
            const removedChange = printTagIfExists(change);
            // setRemovedCopyAllTextHandler(removedChange?.value);
            // oldContentWords += wordsCount(removedChange?.value);
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
          if (change[0] === '+') {
            const addedChange = printTagIfExists(change);
            // newContentWords += wordsCount(addedChange?.value);
            // setAddedCopyAllTextHandler(addedChange?.value);
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
            //   console.log('hello');

            // let response
            const tag = printTagIfExists(change);
            if (!tag) {
              return null;
            }
            return (
              <ReplaceChangeView
                hasRenderedRef={hasRenderedRef}
                setRemovedCopyAllTextHandler={setRemovedCopyAllTextHandler}
                setAddedCopyAllTextHandler={setAddedCopyAllTextHandler}
                key={index}
                index={index}
                tag={tag}
              />
            );
          }
        })}
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
