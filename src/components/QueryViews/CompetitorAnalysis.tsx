import HelperHeader from '@/components/Header/HelperHeader';
import QueryHeader from '@/components/Header/QueryHeader';
import React from 'react';
import Image from 'next/image';
import SubHeader from '@/components/CompetitorAnalysis/SubHeader';
import { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import QueryBanner from '@/components/ChangesBanner/ChangesBanner';
import ExpandedView from '@/components/CompetitorAnalysis/ExpandedView/ExpandedView';
import { Competitor, QuerySummary } from '@/types/my-types';
import useMobileStatus from '@/hooks/useMobileStatus';

import UnExpandedView from '@/components/CompetitorAnalysis/ExpandedView/UnExpandedView';
type Props = {
  querySummary: QuerySummary;
  competitors: Competitor[];
  competitorAnalysed: Competitor;
};

const CompetitorAnalysis = ({
  competitors,
  querySummary,
  competitorAnalysed,
}: Props) => {
  const [showExpandedView, setShowExpandedView] = useState(true);

  const isMobile = useMobileStatus();
  return (
    <>
      <QueryHeader
        highlightedText={competitorAnalysed.title || ''}
        isCompetitor={true}
      />
      <HelperHeader description="Read and analyse all the differences found between two versions. You can compare all the changes made in the web page content." />
      <div className="mt-2 flex flex-col justify-between md:flex-row ">
        <div>
          <SubHeader title={'Monitored competitor page: '} />
          <div className="flex w-[300px] space-x-2 truncate py-4">
            <a
              target="_blank"
              href={competitorAnalysed.link}
              className=" w-fit truncate text-sm font-bold text-customGray hover:underline "
            >
              {' '}
              {competitorAnalysed.link}
            </a>
            <Image src="/linkIcon.svg" width={10} height={10} alt="link icon" />
          </div>
          {!isMobile && (
            <div className="mt-4 flex items-center space-x-4">
              <SubHeader title={'Expanded view:'} />{' '}
              <Toggle
                defaultChecked={showExpandedView}
                onChange={() => setShowExpandedView(!showExpandedView)}
                aria-label="No label tag"
                icons={false}
                className=" toggle-custom bg-customPurple hover:brightness-90"
              />
            </div>
          )}
        </div>
        <QueryBanner
          competitors={competitors}
          competitorAnalysed={competitorAnalysed}
        />
      </div>

      <div className="mt-8 flex space-x-12 ">
        {(showExpandedView || isMobile) && (
          <ExpandedView
            querySummary={querySummary}
            competitorAnalysed={competitorAnalysed}
          />
        )}

      {(!showExpandedView && !isMobile) &&(
        <UnExpandedView
          querySummary={querySummary}
          competitorAnalysed={competitorAnalysed}
        />
      )}
      </div>
    </>
  );
};

export default CompetitorAnalysis;
