import React, { useRef } from 'react';
import { parsedChanges1 } from '@/utils/test';
import ExpandedCard from './ExpandedCard';
type Props = {};

const ExpandedView = (props: Props) => {
  //make use ref element
  return (
    <>
      <div className="flex md:mt-8  md:space-x-12 ">
        <ExpandedCard isRemoved={true} />
        <ExpandedCard isRemoved={false} />
      </div>
    </>
  );
};

export default ExpandedView;
