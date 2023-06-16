import { color } from 'framer-motion';
import React from 'react';

type Props = {
  topTitle: string;
  bottomTitle: string;
  value: number | undefined | string;
  showColor?: boolean;
  showPercentage?: boolean;
  showHashtag?: boolean;
  // value: string,
};

const ChangeCard = ({
  showPercentage = false,
  showHashtag = false,
  topTitle,
  bottomTitle,
  value,
  showColor = false,
}: Props) => {
  let colorValue = '';
  if (value !== undefined && typeof value === 'string') {
    value = parseInt(value);
    if (value > 25) {
      colorValue = 'customRed';
    } else if (value > 10 && value < 25) {
      colorValue = 'customYellow';
    } else {
      colorValue = 'customGreen';
    }
  } else if (value !== undefined && typeof value === 'number') {
    if (value > 25) {
      colorValue = 'customRed';
    } else if (value > 10 && value < 25) {
      colorValue = 'customYellow';
    } else {
      colorValue = 'customGreen';
    }
  }

  return (
    <div className="flex flex-col items-center  justify-center space-y-1 rounded-[25px] bg-white text-sm text-customGray md:w-44 md:rounded-[30px] md:px-4 md:py-1">
      <p>{topTitle}</p>
      <p className="text-[20px] font-bold text-customPurple ">
        {showHashtag && '#'}
        <span className={`${showColor && 'text-' + colorValue}`}>
          {' '}
          {value}
          {showPercentage && '%'}
        </span>
      </p>
      <p>{bottomTitle}</p>
    </div>
  );
};

export default ChangeCard;
