import Header from '@/components/Header/Header';
import React from 'react';
import QueryHeader from '@/components/Header/QueryHeader';
import StaticQuery from '@/components/LanscapeBanners/StaticQueryForm/StaticQueryForm';
import QueryBanner from '@/components/ChangesBanner/ChangesBanner';
import HelperHeader from '@/components/Header/HelperHeader';
import AnalysisBanner from '@/components/AnalysisBanner/AnalysisBanner';
type Props = {};

const querySummary = (props: Props) => {
  return (
    <>
      <QueryHeader
        isCompetitor={false}
        highlightedText="hardcoded comparare follow"
      />
      <HelperHeader description="Here you find the summary of the competitor analysis that we made for you. If you want to know more about one of them, just click the button “Analyse”." />
      <div className="md:flex md:justify-between">
        <StaticQuery showQuery={false} />
        <QueryBanner />
      </div>

      <div className="md:mt-8">
        <Header
          svgPath="/headerIcons/pieIcon.svg"
          description="Query Competitor Analysis"
        />
      </div>
      <HelperHeader description="Here you find the summary of the competitor analysis that we made for you. If you want to know more about one of them, just click the button “Analyse”." />
      <div className="mt-4">
        <AnalysisBanner />
      </div>
    </>
  );
};

export default querySummary;
