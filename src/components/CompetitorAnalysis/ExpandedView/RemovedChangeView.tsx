import React from 'react';

import { Change } from '@/types/my-types';
import HeaderTagView from '../HeaderTagView';
import AdditionalUtilitiesGroup from './AdditionalUtilitiesGroup';
type Props = {
  index: number;
  removedChange: Change;
};
const RemovedChangeView = ({ removedChange, index }: Props) => {
  return (
    <div key={index} className="flex space-x-8 md:space-x-20">
      <div
        className={` flex w-1/2 justify-between rounded-[30px] bg-white  px-4 py-2   text-sm font-bold text-customRed md:space-x-4  `}
      >
        <p>
          <HeaderTagView tag={removedChange?.tag || ''} />
          {removedChange?.value}
        </p>
        <AdditionalUtilitiesGroup
          index={index}
          toBeCopiedText={removedChange?.value}
        />
      </div>
      <div
        className={` pointer-events-none flex w-1/2 justify-between rounded-[30px] bg-[#E0E8F0]   px-4 py-2 text-sm font-bold md:space-x-4`}
      >
        <p className={'invisible'}>{removedChange?.value}</p>

        <span className="text-[9px] text-customGray">#{index+1}</span>
      </div>
    </div>
  );
};

export default RemovedChangeView;