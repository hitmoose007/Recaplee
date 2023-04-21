import React from 'react';
import Header from '@/components/Header';
import HelperHeader from '@/components/HelperHeader';
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


interface queryResult {
    position: number;
    title: string;
    link: string;
    domain: string;
}



type Props = {};

const Step1 = (props: Props) => {
  const { formState, setFormState } = useContext(FormContext);
  const { queryResult, setQueryResult } = useContext(QueryResultContext);
  console.log(queryResult, ' this is query result');
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

      <div className="flex items-center justify-between rounded-[30px] bg-[#EEF6FF]  md:mt-4 md:h-[125px] md:px-10 md:pt-4">
        <div className="flex md:space-x-10">
          <div className=" flex-col  md:space-y-2">
            <p>Type the query:</p>
            <input
              value={formState.query}
              onChange={(e) =>
                setFormState({ ...formState, query: e.target.value })
              }
              type="text"
              className="pointer-events-none rounded-full font-bold text-[#334DD9] md:h-[34px] md:w-[245px] md:pl-4"
            />
          </div>

          <div className="md:space-y-2 ">
            <p>Select Search Engine:</p>
            <select
              value={formState.countryDomain}
              onChange={(e) =>
                setFormState({ ...formState, countryDomains: e.target.value })
              }
              className="pointer-events-none rounded-full font-bold text-[#334DD9] md:h-[34px] md:w-[190px] md:pl-4"
            >
              <option value={formState.countryDomain}>
                {formState.countryDomain}
              </option>
            </select>
          </div>
          <div className="pointer-events-none space-y-2">
            <p>Select Country:</p>
            <CountrySelect country={formState.country} setCountry={() => {}} />
          </div>

          <div className="space flex-col text-[#4B5563] md:space-y-2">
            <p className="text-[#111827]">Select device:</p>
            <div className="flex ">
              <div
                onClick={() => setFormState({ ...formState, isPC: true })}
                className={` ${
                  !formState.isPC && 'hidden'
                } pointer-events-none flex items-center space-x-3 rounded-full bg-white font-bold text-[#334DD9] hover:brightness-95 md:px-4 md:py-1`}
              >
                <Image
                  src="landscapeIcons/pcIcon.svg"
                  width={25}
                  height={25}
                  alt="mobileIcon"
                />
                <span>PC</span>
              </div>
              <div
                onClick={() => setFormState({ ...formState, isPC: false })}
                className={` ${
                  formState.isPC && 'hidden'
                } pointer-events-none flex items-center rounded-full bg-white font-bold text-[#334DD9] hover:brightness-95 md:px-4 md:py-1`}
              >
                <Image
                  src="landscapeIcons/mobileIcon.svg"
                  width={25}
                  height={25}
                  alt="mobileIcon"
                />
                <p>Mobile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <span className="font-bold  ">7 out of 10 </span>competitors
            selected
          </div>
          <div>
            <SaveButton />
          </div>
        </div>

        <div className="grid md:mt-10 md:grid-cols-2 md:gap-x-14 md:gap-y-6">
          {queryResult?.map((competitor:queryResult) => {
            return <CompetitorCard 
            key={competitor.position}
            position={competitor.position}
            title={competitor.title}
            link={competitor.link}
            domain={competitor.domain}
            
             />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Step1;
