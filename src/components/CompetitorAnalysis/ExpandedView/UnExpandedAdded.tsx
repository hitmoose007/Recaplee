import React, { useEffect } from 'react';
import { Change } from '@/types/my-types';
import HeaderTagView from '../HeaderTagView';
import AdditionalUtilitiesGroup from './AdditionalUtilitiesGroup';
type Props = {
  index: number;
  AddedChange: Change;
  setAddedCopyAllTextHandler: (text: string) => void;
  hasRenderedRef: React.MutableRefObject<boolean>;
};

const AddedChangeView = ({
  index,
  AddedChange,
  hasRenderedRef,
  setAddedCopyAllTextHandler,
}: Props) => {
  useEffect(() => {
    if (hasRenderedRef.current) {
      setAddedCopyAllTextHandler(AddedChange?.value);
    }
  }, [AddedChange?.value]);

  return (
    <div key={index} className="flex   md:space-x-20">
      {/* <div
        className={`md:flex hidden justify-between rounded-[30px] bg-[#E0E8F0]  px-4 py-2   text-sm font-bold  md:space-x-4  `}
      >
        <p className={'invisible'}>{AddedChange?.value}</p>
        <span className="text-[9px] text-customGray">#{index + 1}</span>
      </div> */}
      <div
        className={` flex w-full flex-col justify-between rounded-[30px] bg-white  px-4 py-2 text-sm  font-bold text-customGreen md:flex-row  md:space-x-4  `}
      >
        <p>
          <HeaderTagView tag={AddedChange?.tag || ''} />
          {AddedChange?.value}
        </p>
        <AdditionalUtilitiesGroup
          index={index}
          toBeCopiedText={AddedChange?.value}
        />
      </div>
    </div>
  );
};

export default AddedChangeView;