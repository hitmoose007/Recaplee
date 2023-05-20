import React from 'react';
import { Change } from '@/types/my-types';
import HeaderTagView from '../HeaderTagView';
type Props = {
  index: number;
  AddedChange: Change;
};

const AddedChangeView = ({ index, AddedChange }: Props) => {
  return (
    <div key={index} className="flex space-x-8 md:space-x-20">
      <div
        className={` pointer-events-none  w-full rounded-[30px] bg-[#E0E8F0]  p-2    text-sm font-bold  md:space-x-4  md:space-y-4 `}
      >
        <p className={'invisible'}>{AddedChange?.value}</p>
      </div>
      <div
        className={` pointer-events-none w-full rounded-[30px] bg-white  p-2    text-sm font-bold text-customGreen md:space-x-4  md:space-y-4 `}
      >
        <p>
          <HeaderTagView tag={AddedChange?.tag || ''} />
          {AddedChange?.value}
        </p>
      </div>
    </div>
  );
};

export default AddedChangeView;
