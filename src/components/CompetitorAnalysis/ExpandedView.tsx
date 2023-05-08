import React, { useRef } from 'react';
import { parsedChanges1 } from '@/utils/test';
import ExpandedCard from './ExpandedCard';
import TestBanner from './TestBanner';
type Props = {};

const ExpandedView = (props: Props) => {
  //make use ref element
  return (
    <>
      <div className="flex md:mt-8  md:space-x-12 ">
        <TestBanner />
        {/* <ExpandedCard isRemoved={true} />
        <ExpandedCard isRemoved={false} /> */}
      </div>
    </>
  );
};

export default ExpandedView;
