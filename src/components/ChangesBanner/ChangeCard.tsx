import React from 'react';

type Props = {
  topTitle: string;
  bottomTitle: string;
  value: number;
  // value: string,
};

const ChangeCard = ({ topTitle, bottomTitle,value}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 rounded-[30px] bg-white text-sm text-customGray md:w-44 md:px-4 md:py-1">
      <p>{topTitle}</p>
      <p className="text-[20px] font-bold text-customPurple ">{value}</p>
      <p>{bottomTitle}</p>
    </div>
  );
};

export default ChangeCard;
