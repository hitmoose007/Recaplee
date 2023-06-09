import React from 'react';
import Header from '@/components/Header/Header';
import HelperHeader from '@/components/Header/HelperHeader';
import { useState, useEffect } from 'react';
import { FormContext } from '../../context/FormContext';
import { useContext } from 'react';
import CompetitorCard from '../Competitors/CompetitorCard';
import SaveButton from '../Competitors/SaveButton';
import { QueryResultContext } from '../../context/QueryResultContext';
import StaticQueryForm from '../LanscapeBanners/StaticQueryForm/StaticQueryForm';
import { PageContext } from '../../context/PageContext';
import { PageView } from '../../utils/enums';
import CustomCompetitorInput from '../Competitors/CustomCompetitorInput';
import extractDomain from 'extract-domain';
import useUserId from '../../hooks/useUserId';
import { link } from 'fs';
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
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const { setPage } = useContext(PageContext);
  const [totalCustomCompetitors, setTotalCustomCompetitors] = useState(0);
  const [customCompetitorArray, setCustomCompetitorArray] = useState<string[]>(
    []
  );
  const userId = useUserId();

  let loading = false;
  const handleSelectCompetitor = (competitorKey: string) => {
    setSelectedCompetitors((prevSelectedCompetitors: string[]) =>
      prevSelectedCompetitors.includes(competitorKey)
        ? prevSelectedCompetitors.filter((key: string) => key !== competitorKey)
        : [...prevSelectedCompetitors, competitorKey]
    );
  };

  const handleSave = async () => {
    if (loading) return;
    else loading = true;
    if (selectedCompetitors.length === 0 && totalCustomCompetitors === 0) {
      alert('Please select at least one competitor');
      return;
    }

    const filteredQuery = queryResult.filter((item: queryResult) => {
      return selectedCompetitors.includes(item.link);
    });

    const selectedCustomCompetitors = selectedCompetitors.filter(
      (item: string) => {
        if (customCompetitorArray.includes(item)) {
          return item;
        }
        return;
      }
    );

    const response = await fetch('/api/saveQuery', {
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
        competitors_tracked:
          filteredQuery.length + customCompetitorArray.length,
        customCompetitors: selectedCustomCompetitors,
        userId: userId,
      }),
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    setPage(PageView.DASHBOARD);
  };

  console.log(selectedCompetitors,'this is number selected ooo aa a')
  return (
    <div>
      <Header
        svgPath="headerIcons/plusTargetIcon.svg"
        description="Add new Target Query"
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
      <div className="mt-4 rounded-[30px] bg-[#EEF6FF]  px-10 py-4 text-[#4B5563]">
        <div className="flex  justify-between md:flex-row flex-col">
          <div className="w-full ">
            <span className="font-bold    ">
              {selectedCompetitors.length} out of {queryResult.length}{' '}
            </span>
            competitors selected
          </div>
        <div className={`mt-4 flex md:h-auto  w-full justify-center md:justify-end`}>
          <SaveButton handleSave={handleSave} />
        </div>
        </div>

        <div className="mt-10  flex-col space-y-4 md:grid md:flex-none  md:grid-cols-2 md:gap-x-14 md:gap-y-6 md:space-y-0">
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
          {customCompetitorArray?.map((competitor: string, index: number) => {
            return (
              <CompetitorCard
                selectedCompetitors={selectedCompetitors}
                customCompetitor={true}
                key={competitor}
                position={index * -1}
                title={competitor}
                link={competitor}
                domain={extractDomain(competitor)}
                totalCustomCompetitors={totalCustomCompetitors}
                setTotalCustomCompetitors={setTotalCustomCompetitors}
                handleSelectCompetitor={handleSelectCompetitor}
                setCustomCompetitorArray={setCustomCompetitorArray}
              />
            );
          })}

          <CustomCompetitorInput
            customCompetitorArray={customCompetitorArray}
            queryResult={queryResult}
            totalCustomCompetitors={totalCustomCompetitors}
            setTotalCustomCompetitors={setTotalCustomCompetitors}
            setCustomCompetitorArray={setCustomCompetitorArray}
            handleSelectCompetitor={handleSelectCompetitor}
          />
        </div>
        <div className={`mt-8 flex w-full justify-center md:justify-end`}>
          <SaveButton handleSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default Step2;
