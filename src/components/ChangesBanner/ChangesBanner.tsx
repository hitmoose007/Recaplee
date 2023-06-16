import React from 'react';
import ChangeCard from './ChangeCard';
import { Competitor, QuerySummary } from '@/types/my-types';
import { PageView } from '@/utils/enums';
import { PageContext } from '@/context/PageContext';
import { useContext } from 'react';
import {getAverageChangesPerWebsite } from '@/utils/helper'
type Props = {
  competitors: Competitor[];
  competitorAnalysed?: Competitor;
  querySummary?: QuerySummary;
};

const QueryBanner = ({
    //make competitiors optional 
    
  competitors  ,
  querySummary,
  competitorAnalysed,
}: Props) => {
  const { page } = useContext(PageContext);
  //   const { serpChanges } = useSerpContext();

  const serpChanges = getSerpChanges(competitors || []);
  const averageChangesPerWebsite = getAverageChangesPerWebsite(competitors || []);
  return (
    <div className="md:rounded-[30px] space-y-4 mt-4 md:space-y-0   bg-customBlue  md:mt-4 md:space-x-4 md:px-8 md:py-4 flex md:flex-row flex-col">
      {page === PageView.SUMMARYVIEW && (
        <>
          <ChangeCard
            value={serpChanges}
            topTitle="Detection of"
            bottomTitle="SERP Changes"
          />
          <ChangeCard
            value={averageChangesPerWebsite.toFixed(1)}
            topTitle="Average of"
            bottomTitle="changes per webiste"
          />
        </>
      )}
      {page === PageView.COMPETITORVIEW && (
        <>
          <ChangeCard
          showHashtag={true}
            value={competitorAnalysed?.current_position}
            topTitle="Ranking as"
            bottomTitle="on Search Engine"
          />
          <ChangeCard
          showPercentage={true}
            value={competitorAnalysed?.content_changed}
            topTitle="A total of"
            bottomTitle="of content changed"
          />
          <ChangeCard
    
            value={averageChangesPerWebsite.toFixed(1)}
            topTitle="Average of"
            bottomTitle="changes per webiste"
          />
        </>
      )}
    </div>
  );
};

export default QueryBanner;
function getSerpChanges(competitors: Competitor[]) {
  let serpChanges = 0;
  competitors.forEach((competitor) => {
    if (
      competitor.current_position === undefined ||
      competitor.last_position === undefined
      || competitor.current_position === null ||
        competitor.last_position === null
        
    )
      return;
    if (competitor.current_position - competitor.last_position !== 0) {
      serpChanges++;
    }
  });
  return serpChanges;
}

