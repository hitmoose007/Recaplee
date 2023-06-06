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
    <div className="md:mx-none mx-auto my-6  flex h-[160px] w-[180px] flex-col items-center justify-between rounded-[30px] bg-white    p-3 hover:cursor-pointer hover:brightness-95">
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
