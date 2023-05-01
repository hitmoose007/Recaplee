import React from 'react';
import Header from '@/components/Header/Header';
type Props = {
  isCompetitor: boolean;
  highlightedText: string;
};
//hardcoded query name
const QueryHeader = ({ isCompetitor , highlightedText }: Props) => {
  return (
    <div className="flex">
      {!isCompetitor ? (
        <Header
          svgPath="/headerIcons/cameraIcon.svg"
          description="Query monitory for: "
        />
      ) : (
        <Header
          svgPath="/headerIcons/magnifyingGlassIcon.svg"
          description="Competitor Analysis: "
        />
      )}
      <span className="text-[32px] font-bold text-customPurple md:pl-3 ">
        {highlightedText}
      </span>
    </div>
  );
};

export default QueryHeader;