import React from 'react';
import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';
import Link from 'next/link';
type Props = {
  countryCode: string;
  queryTitle: string;
  competitorsTracked: number;
  lastUpdate: string;
};

const QueryCards = ({
  countryCode,
  queryTitle,
  competitorsTracked,
  lastUpdate,
}: Props) => {
  return (
      <div className="flex flex-col items-center  justify-between rounded-[30px] bg-white hover:cursor-pointer hover:brightness-95 md:h-[160px] md:w-[180px] md:p-3">
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          style={{
            width: '25px',
            height: '25px',
          }}
        />
        <p className="text-center text-sm font-bold text-[#705CF6]">
          {queryTitle}
        </p>

        <div className="flex flex-col space-y-1 text-xs text-[#4B5563]">
          <p className="">{competitorsTracked} competitors tracked</p>
          <p> Last update: {lastUpdate} </p>
        </div>
      </div>
 
  );
};

export default QueryCards;
