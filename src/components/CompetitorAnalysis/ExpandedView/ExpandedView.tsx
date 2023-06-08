import { parsedChanges1 } from '@/utils/test';
import { IoCopyOutline } from 'react-icons/io5';
import { diff_match_patch } from 'diff-match-patch';
import HeaderTagView from '../HeaderTagView';
import { useState } from 'react';
import { Competitor, QuerySummary } from '@/types/my-types';
import AddedChangeView from './AddedChangeView';
import RemovedChangeView from './RemovedChangeView';
import ReplaceChangeView from './ReplaceChangeView';
import ExpandedBanner from './ExpandedBanner';
import wordsCount from 'words-count';
type Props = {
  competitorAnalysed: Competitor;
  querySummary: QuerySummary;
};

const ExpandedView = ({ competitorAnalysed, querySummary }: Props) => {
  //   const [parsedChanges, setParsedChanges] = useState<string[][]>([]);
  const [oldContentWordsState, setOldContentWords] = useState<number>(0);
  const [newContentWordsState, setNewContentWords] = useState<number>(0);

  let oldContentWords = oldContentWordsState;
  let newContentWords = newContentWordsState;

  //function for incrementing and decrementing words count

  return (
    <>
      <div className="flex w-full flex-col space-y-4 rounded-[30px] bg-customBlue px-4 py-4 text-sm ">
        <ExpandedBanner
          querySummary={querySummary}
          competitorAnalysed={competitorAnalysed}
        />

        {competitorAnalysed.changed_content?.map((change, index) => {
          if (change[0] === '-') {
            const removedChange = printTagIfExists(change);
            // oldContentWords += wordsCount(removedChange?.value);
            return (
              <RemovedChangeView key={index} index={index} removedChange={removedChange} />
            );
          }
          if (change[0] === '+') {
            const addedChange = printTagIfExists(change);
            // newContentWords += wordsCount(addedChange?.value);
            return <AddedChangeView key={index} index={index} AddedChange={addedChange} />;
          }

          if (change[0] === '~') {
            //   console.log('hello');

            // let response
            const tag = printTagIfExists(change);
            if (!tag) {
              return null;
            }
            return <ReplaceChangeView key={index}index={index} tag={tag} />;
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
