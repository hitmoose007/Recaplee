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
  const { page, setPage } = useContext(PageContext);
  const [totalCustomCompetitors, setTotalCustomCompetitors] = useState(0);
  const [customCompetitorArray, setCustomCompetitorArray] = useState<string[]>(
    []
  );
  const userId = useUserId();

  const handleSelectCompetitor = (competitorKey: number) => {
    // console.log('trying to udpate selected competitors')
    setSelectedCompetitors((prevSelectedCompetitors: any) =>
      prevSelectedCompetitors.includes(competitorKey)
        ? prevSelectedCompetitors.filter((key: number) => key !== competitorKey)
        : [...prevSelectedCompetitors, competitorKey]
    );
  };

  const handleSave = async () => {
    if (selectedCompetitors.length === 0 && totalCustomCompetitors === 0) {
      alert('Please select at least one competitor');
      return;
    }

    const filteredQuery = queryResult.filter((item: queryResult) => {
      return selectedCompetitors.includes(item.position_overall);
    });

    const selectedCustomCompetitors = selectedCompetitors.filter(
      (item: number) => {
        return item <= 0;
      }
    );

    const filteredCustomCompetitors = customCompetitorArray.filter(
      (item: string, index: number) => {
        return selectedCustomCompetitors.includes(index * -1);
      }
    );

    // console.log(filteredCustomCompetitors);
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
        customCompetitors: filteredCustomCompetitors,
        userId: userId,
      }),
    });
    const data = await response.json();
    //check if error then throw alert
    if (data.error) {
      alert(data.error);
      return;
    }
    // console.log(queryResult, 'queryResult')
    setPage(PageView.DASHBOARD);
  };
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
        <div className="flex justify-between">
          <div>
            <span className="font-bold  ">
              {selectedCompetitors.length} out of 10{' '}
            </span>
            competitors selected
          </div>
          <div className="hidden md:block">
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
                key={index * -1}
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
            totalCustomCompetitors={totalCustomCompetitors}
            setTotalCustomCompetitors={setTotalCustomCompetitors}
            setCustomCompetitorArray={setCustomCompetitorArray}
          />
        </div>
        <div className="mt-8 flex flex-row-reverse">
          <SaveButton handleSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default Step2;
