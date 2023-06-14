import React from 'react';
import Header from '@/components/Header/Header';
import HelperHeader from '@/components/Header/HelperHeader';
import NewQueryForm from '@/components/LanscapeBanners/NewQueryForm';
import { useState, useEffect, useContext } from 'react';
import QueryCards from '../QueryCards';
import Image from 'next/image';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { useSession } from '@supabase/auth-helpers-react';
import { PageView } from '@/utils/enums';
import { PageContext } from '@/context/PageContext';
import { Competitor, QuerySummary } from '@/types/my-types';
import Link from 'next/link';
import { useUserContext } from '@/context/user';
import InfoPanel from './InfoPanel';
type Props = {};

const Home = (props: Props) => {
  const [queryArray, setQueryArray] = useState<QuerySummary[]>([]);

  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const { page, setPage } = useContext(PageContext);
  const session = useSession();
  const [isEmailEnabled, setIsEmailEnabled] = useState<boolean>();

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        let res;
        res = await fetch('/api/getQueries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session?.user?.id,
          }),
        });

        const data = await res.json();

        setQueryArray(data);
      } catch (error) {
        console.error(error);
      }
    };

    setPage(PageView.DASHBOARD);

    if (queryArray.length === 0) {
      setIsLoading(false);
    }

    fetchQuery();
  }, []);

  useEffect(() => {
    if (user?.email_enabled !== undefined && user?.email_enabled !== null) {
      console.log(user?.email_enabled);
      setIsEmailEnabled(user?.email_enabled);
      console.log(isEmailEnabled, 'dasf');
    }
  }, [user]);


  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Header
        svgPath="headerIcons/targetIcon.svg"
        description="Target Queries"
      />
      <HelperHeader
        description={`These are the queries that are currently monitored. We will analyze and report to you the changes that have been made on your competitors’ website.`}
      />

      <div className="mt-4 min-h-[220px] flex-col  rounded-[30px] bg-[#EEF6FF] py-2 pb-5 md:flex md:w-auto   md:flex-row md:flex-wrap md:space-x-8 md:space-y-5 md:px-0">
        <Image
          onClick={() => setPage(PageView.STEP1VIEW)}
          className="mx-auto pt-2 md:pt-0 cursor-pointer hover:brightness-50 md:mx-0 md:ml-8 md:mt-4"
          width={180}
          height={160}
          src="/landscapeIcons/addNewBigIcon.svg"
          alt="add new query big icon"
        />

        {Array.isArray(queryArray) &&
          queryArray.map((query: QuerySummary, index) => {
            return (
              <div key={query.id}>
                <a href={`/querySummary/${query.id}`}>
                  <QueryCards
                    key={query.id}
                    id={query.id}
                    queryTitle={query.query_name || ''}
                    countryCode={query.country || ''}
                    competitorsTracked={query.competitors_tracked || 0}
                    lastUpdate={
                      query.recent_update
                        ? new Date(query.recent_update).toLocaleDateString()
                        : ''
                    }
                  />
                </a>
              </div>
            );
          })}
      </div>
      <InfoPanel isEmailEnabled={isEmailEnabled || false} setIsEmailEnabled={setIsEmailEnabled} />
    </div>

  );
};

export default Home;
