import React from 'react';
import { Change } from '@/types/my-types';
import HeaderTagView from '../HeaderTagView';
import AdditionalUtilitiesGroup from './AdditionalUtilitiesGroup';
type Props = {
  index: number;
  AddedChange: Change;
};

const AddedChangeView = ({ index, AddedChange }: Props) => {
  return (
    <div key={index} className="flex space-x-8 md:space-x-20">
      <div
        className={`flex w-1/2 justify-between rounded-[30px] bg-[#E0E8F0]  px-4 py-2   text-sm font-bold  md:space-x-4  `}
      >
        <p className={'invisible'}>{AddedChange?.value}</p>
        <span className="text-[9px] text-customGray">#{index+1}</span>
      </div>
      <div
        className={` flex w-1/2 justify-between rounded-[30px] text-customGreen bg-white  px-4 py-2   text-sm font-bold  md:space-x-4  `}
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
