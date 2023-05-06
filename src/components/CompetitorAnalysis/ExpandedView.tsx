import React, {useRef} from 'react';
import { parsedChanges1 } from '@/utils/test';
import ExpandedCard from './ExpandedCard';
type Props = {};

const ExpandedView = (props: Props) => {

    //make use ref element 
    const removedRef = useRef(null)
    const notRemovedRef = useRef(null)
  return (
    <>
      <div className="flex md:mt-8  md:space-x-12 ">
        <ExpandedCard removedRef={removedRef} notRemovedRef={notRemovedRef} isRemoved={true} />
        <ExpandedCard removedRef={removedRef} notRemovedRef={notRemovedRef} isRemoved={false} />
      </div>
    </>
  );
};

export default ExpandedView;
