import React from 'react';
import Header from '@/components/Header';
import HelperHeader from '@/components/HelperHeader';
import NewQueryForm from '@/components/LanscapeBanners/NewQueryForm';
import { useState, useEffect } from 'react';
import QueryCards from '../QueryCards';

type Props = {};
interface Query {
  query_name?: string;
  country?: string;
  last_update?: Date;
  competitors_tracked?: number;
  new_changes?: number;
}

const Home = (props: Props) => {
  const [queryArray, setQueryArray] = useState<Query[]>([]);
  useEffect(() => {
    const fetchQuery = async () => {
      const res = await fetch('/api/getQueries');
      const data = await res.json();
      setQueryArray(data);
    };
    fetchQuery();
  }, []);

  return (
    <div>
      <Header
        svgPath="headerIcons/targetIcon.svg"
        description="Target Queries"
      />
      <HelperHeader
        description={`These are the queries that are currently monitored. We will analyze and report to you the changes that have been made on your competitors’ website.`}
      />

      <div className="rounded-[30px] bg-[#EEF6FF] md:mt-4 md:flex md:space-x-8 md:px-10 md:py-4 ">
        {queryArray.map((query: Query) => {
          return (
            <QueryCards
              queryTitle={query.query_name || ''}
              countryCode={query.country || ''}
              competitorsTracked={query.competitors_tracked || 0}
              lastUpdate={
                query.last_update
                  ? new Date(query.last_update).toLocaleDateString()
                  : ''
              }
            />
          );
        })}
      </div>
      <div className="md:mt-6 flex">
        <div>
            <Header svgPath="headerIcons/bookIcon.svg" description="How Recaplee works?" />
            <HelperHeader description="In this page you will be able to add new queries or check for any update!" />
            <div className="bg-[#EEF6FF]"> 
            

            </div>
        </div>
        <div></div>

      </div>
    </div>
  );
};

export default Home;
