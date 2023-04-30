import React from 'react';
import Header from '@/components/Header/Header';
type Props = {};
//hardcoded query name
const QueryHeader = (props: Props) => {
  return (
    <div className="flex">
      <Header
        svgPath="/headerIcons/cameraIcon.svg"
        description="Query monitory for: "
      />
      <span className="text-[32px] font-bold text-customPurple md:pl-3 ">Fish eater</span>
    </div>
  );
};

export default QueryHeader;
