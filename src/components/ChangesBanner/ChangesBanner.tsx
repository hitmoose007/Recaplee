import React from 'react';
import ChangeCard from './ChangeCard';
import { Competitor, QuerySummary } from '@/types/my-types';
import { PageView } from '@/utils/enums';
import { PageContext } from '@/context/PageContext';
import { useContext } from 'react';
type Props = {
  competitorAnalysed?: Competitor;
  querySummary?: QuerySummary;
};

const QueryBanner = ({ querySummary, competitorAnalysed }: Props) => {
  const { page } = useContext(PageContext);
  return (
    <div className="flex rounded-[30px]  bg-customBlue md:mt-4 md:space-x-4 md:px-8 md:py-4">
      {page === PageView.SUMMARYVIEW && (
        <>
          <ChangeCard
            value={querySummary?.changes_per_website}
            topTitle="Detection of"
            bottomTitle="SERP Changes"
          />
          <ChangeCard
            value={querySummary?.new_changes}
            topTitle="Average of"
            bottomTitle="changes per webiste"
          />
        </>
      )}
      {page === PageView.COMPETITORVIEW && (
        <>
          <ChangeCard
            value={competitorAnalysed?.current_position}
            topTitle="Ranking as"
            bottomTitle="on Search Engine"
          />
          <ChangeCard
            value={competitorAnalysed?.content_changed}
            topTitle="A total of"
            bottomTitle="of content changed"
          />
          <ChangeCard
            value={competitorAnalysed?.content_changed}
            topTitle="Average of"
            bottomTitle="changes per webiste"
          />
        </>
      )}
    </div>
  );
};

export default QueryBanner;
