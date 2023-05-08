import React from 'react';
import ChangeCard from './ChangeCard';

type Props = {};

const QueryBanner = (props: Props) => {
  return (
    <div className="flex rounded-[30px]  bg-customBlue md:mt-4 md:space-x-4 md:px-8 md:py-4">
      <ChangeCard value={0}topTitle="Detection of" bottomTitle="SERP Changes" />
      <ChangeCard value={0} topTitle="Average of" bottomTitle="changes per webiste" />
    </div>
  );
};

export default QueryBanner;
