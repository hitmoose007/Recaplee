import React from 'react';
import Header from '@/components/Header/Header';
import HelperHeader from '@/components/Header/HelperHeader';
import NewQueryForm from '@/components/LanscapeBanners/NewQueryForm';
import { useState } from 'react';
import { FormContext } from '../../context/FormContext';
import { useContext } from 'react';
import Image from 'next/image';
import CountrySelect from '@/components/LanscapeBanners/CountrySelect';
import { countryDomains } from '@/utils/countryList';
import CompetitorCard from '../Competitors/CompetitorCard';
import SaveButton from '../Competitors/SaveButton';
import { QueryResultContext } from '../../context/QueryResultContext';
import StaticQueryForm from '../LanscapeBanners/StaticQueryForm/StaticQueryForm';
interface queryResult {
  position_overall: number;
  title: string;
  link: string;
  domain: string;
}

type Props = {};

const Step2 = (props: Props) => {
  // const prisma = new PrismaClient();
  const { formState, setFormState } = useContext(FormContext);
  const { queryResult } = useContext(QueryResultContext);
  const [selectedCompetitors, setSelectedCompetitors] = useState<number[]>([]);

  const handleSelectCompetitor = (competitorKey: number) => {
    setSelectedCompetitors((prevSelectedCompetitors: any) =>
      prevSelectedCompetitors.includes(competitorKey)
        ? prevSelectedCompetitors.filter((key: number) => key !== competitorKey)
        : [...prevSelectedCompetitors, competitorKey]
    );
  };

  const handleSave = async () => {
    console.log(selectedCompetitors, 'selected competitors');
    const filteredQuery = queryResult.filter((item: queryResult) => {
      return selectedCompetitors.includes(item.position_overall);
    });

    const data = await fetch('/api/saveQuery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: formState.query,
        country: formState.country,
        countryDomain: formState.countryDomain,
        isPC: formState.isPC,
        competitors: filteredQuery,
        competitors_tracked: filteredQuery.length,
      }),
    });
    const newQuery = await data.json();
    console.log(newQuery, 'new query');
  };
  return (
    <div>
      <Header
        svgPath="headerIcons/plusTargetIcon.svg"
        description="Add neww Target Query"
      />
      <HelperHeader
        description={`Type the query that you want to monitor, select the search engine,
       the device and the location to be used to search.`}
      />

      <StaticQueryForm />
      <div className="mt-8">
        <Header
          svgPath="headerIcons/tickIcon.svg"
          description="Select the Competitors"
        />
        <HelperHeader
          description={`Click the box to select or deselect a competitor that you want to monitor: we will inform you of any change in the content and SERP position!`}
        />
      </div>
      <div className="rounded-[30px] bg-[#EEF6FF] text-[#4B5563] md:mt-4 md:px-10 md:py-4">
        <div className="flex justify-between">
          <div>
            <span className="font-bold  ">
              {selectedCompetitors.length} out of 10{' '}
            </span>
            competitors selected
          </div>
          <div>
            <SaveButton handleSave={handleSave} />
          </div>
        </div>

        <div className="grid md:mt-10 md:grid-cols-2 md:gap-x-14 md:gap-y-6">
          {queryResult?.map((competitor: queryResult) => {
            return (
              <CompetitorCard
                key={competitor.position_overall}
                position={competitor.position_overall}
                title={competitor.title}
                link={competitor.link}
                domain={competitor.domain}
                handleSelectCompetitor={handleSelectCompetitor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Step2;
