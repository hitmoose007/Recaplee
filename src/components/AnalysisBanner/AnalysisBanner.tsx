import React from 'react';
import AnalysisCard from './AnalysisCard';

type Props = {};

const AnalysisBanner = (props: Props) => {
  return (
    <div className="flex flex-col rounded-[30px] bg-customBlue md:space-y-3 md:px-8 md:py-4">
      <AnalysisCard />
      <AnalysisCard />
      <AnalysisCard />
    </div>
  );
};

export default AnalysisBanner;
