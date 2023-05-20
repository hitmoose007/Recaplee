import { parsedChanges1 } from '@/utils/test';
import { IoCopyOutline } from 'react-icons/io5';
import { diff_match_patch } from 'diff-match-patch';
import HeaderTagView from '../HeaderTagView';
import { Competitor, QuerySummary } from '@/types/my-types';
import AddedChangeView from './AddedChangeView';
import RemovedChangeView from './RemovedChangeView';
import ReplaceChangeView from './ReplaceChangeView';
type Props = {
  competitorAnalysed: Competitor;
  querySummary: QuerySummary;
};

const ExpandedView = ({ competitorAnalysed, querySummary }: Props) => {
  //   const [parsedChanges, setParsedChanges] = useState<string[][]>([]);

  return (
    <>
      <div className="flex w-full flex-col space-y-4 rounded-[30px] bg-customBlue px-4 py-16 text-sm ">
        <div
          className="flex space-x-2 text-customGray hover:cursor-pointer "
          onClick={() => {
            navigator.clipboard.writeText(
              JSON.stringify(competitorAnalysed.changed_content) || ''
            );
          }}
        >
          {' '}
          <span>Click to Copy All</span>
          <IoCopyOutline size={20} color="gray" />
        </div>
        {competitorAnalysed.changed_content?.map((change, index) => {
          if (change[0] === '-') {
            const removedChange = printTagIfExists(change);
            return (
              <RemovedChangeView index={index} removedChange={removedChange} />
            );
          }
          if (change[0] === '+') {
            const addedChange = printTagIfExists(change);

            return <AddedChangeView index={index} AddedChange={addedChange} />;
          }

          if (change[0] === '~') {
            //   console.log('hello');

            // let response
            const tag = printTagIfExists(change);
            if (!tag) {
              return null;
            }
            return <ReplaceChangeView index={index} tag={tag} />;
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
