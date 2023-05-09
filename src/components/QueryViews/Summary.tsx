import Header from '@/components/Header/Header';
import React, { useEffect, useState } from 'react';
import QueryHeader from '@/components/Header/QueryHeader';
import StaticQuery from '@/components/LanscapeBanners/StaticQueryForm/StaticQueryForm';
import QueryBanner from '@/components/ChangesBanner/ChangesBanner';
import ChangeCard from '@/components/ChangesBanner/ChangeCard';
import HelperHeader from '@/components/Header/HelperHeader';
import { Competitor, QuerySummary } from '@/types/my-types';
import AnalysisCard from '@/components/AnalysisBanner/AnalysisCard';
import { useRouter } from 'next/router';
import ChangesBanner from '@/components/ChangesBanner/ChangesBanner';

type Props = {
  querySummary: QuerySummary;
  competitorArray: Competitor[];
  setCompetitorAnalysed: (competitor: Competitor) => void;
};

const Summary = ({ setCompetitorAnalysed, querySummary, competitorArray }: Props) => {
  return (
    <>
      <QueryHeader
        isCompetitor={false}
        highlightedText={querySummary?.query_name || ''}
      />
      <HelperHeader description="Here you find the summary of the competitor analysis that we made for you. If you want to know more about one of them, just click the button “Analyse”." />
      <div className="md:flex md:justify-between">
        <StaticQuery querySummary={querySummary} isQuerySummaryPage={true} />
        {/* <div className="flex rounded-[30px]  bg-customBlue md:mt-4 md:space-x-4 md:px-8 md:py-4">
          <ChangeCard
            value={querySummary?.serp_chnages || -1}
            topTitle="Detection of"
            bottomTitle="SERP Changes"
          />
          <ChangeCard
            value={querySummary?.new_changes || -1}
            topTitle="Average of"
            bottomTitle="changes per webiste"
          />
        </div> */}

        <ChangesBanner querySummary={querySummary} />
      </div>

      <div className="md:mt-8">
        <Header
          svgPath="/headerIcons/pieIcon.svg"
          description="Query Competitor Analysis"
        />
      </div>
      <HelperHeader description="Here you find the summary of the competitor analysis that we made for you. If you want to know more about one of them, just click the button “Analyse”." />
      <div className="mt-4 flex flex-col rounded-[30px] bg-customBlue md:space-y-3 md:px-8 md:py-4">
        {competitorArray.map((competitor) => {
          if (querySummary) {
            return (
              <AnalysisCard
              setCompetitorAnalysed={setCompetitorAnalysed}
                competitor={competitor}
                querySummary={querySummary}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default Summary;
