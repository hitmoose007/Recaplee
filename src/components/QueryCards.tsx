import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useUserContext } from '@/context/user';
import { Competitor } from '@/types/my-types';

import { useSession } from '@supabase/auth-helpers-react';
type Props = {
  id: string;
  countryCode: string;
  queryTitle: string;
  competitorsTracked: number;
  lastUpdate: string;
};

const QueryCards = ({
  id,
  countryCode,
  queryTitle,
  competitorsTracked,
  lastUpdate,
}: Props) => {
  const [competitorArray, setCompetitorArray] = useState([]);
  const [totalChanges, setTotalChanges] = useState<number>();
  const userSession = useSession();

  useEffect(() => {
    async function fetchQuerySummary() {
      try {
        const res = await fetch(`/api/getQuerySummary/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userSession?.user?.id,
          }),
        });

        const json = await res.json();
        setCompetitorArray(json.competitors);
        setTotalChanges(json.querySummary.new_changes);
      } catch (error: unknown) {
        if (error instanceof Error) console.log(error.message);
      }
    }

    if (userSession?.user?.id) {
      fetchQuerySummary();
    }
  }, []);

  //   if(competitorArray.length === 0) return (<></>)
  return (
    <div className="md:mx-none mx-auto   flex h-[160px] w-[180px] flex-col items-center justify-between rounded-[30px] bg-white    p-3 hover:cursor-pointer hover:brightness-95">
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
        {totalChanges !== undefined && totalChanges === 0 && (
          <p> Last update: {lastUpdate} </p>
        )}
        {totalChanges !== undefined && totalChanges > 0 && (
          <p className="-ml-[10px] text-customGreen">
            &#x2022; {totalChanges} New Changes Found
          </p>
        )}
      </div>
    </div>
  );
};

export default QueryCards;
