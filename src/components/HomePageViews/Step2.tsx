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
type Props = {};

const Step1 = (props: Props) => {
  const { formState, setFormState } = useContext(FormContext);

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
              onChange={(e) =>
                setFormState({ ...formState, query: e.target.value })
              }
              type="text"
              className="rounded-full md:h-[34px] md:w-[245px] md:pl-4"
            />
          </div>

          <div className="md:space-y-2 ">
            <p>Select Search Engine:</p>
            <select
            
              value={formState.countryDomain}
              onChange={(e) =>
                setFormState({ ...formState, countryDomains: e.target.value })
              }
              className="rounded-full md:h-[34px] md:w-[190px] md:pl-4 pointer-events-none text-[#334DD9] font-bold"
            >
              {/* {countryDomains.map((countryDomain) => {
                return <option value={countryDomain}>{countryDomain}</option>;
              })} */}
            </select>
          </div>
          <div className="space-y-2 pointer-events-none">
            <p>Select Country:</p>
            <CountrySelect
              country={formState.country}
              setCountry={() => {}}
            />
          </div>

          <div className="space flex-col text-[#4B5563] md:space-y-2">
            <p className="text-[#111827]">Select device:</p>
            <div className="flex ">
              <div
                onClick={() => setFormState({ ...formState, isPC: true })}
                className={` ${
                  !formState.isPC && 'hidden'
                } flex pointer-events-none items-center space-x-3 rounded-full bg-white hover:brightness-95 md:px-4 md:py-1 text-[#334DD9] font-bold`}
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
                } flex pointer-events-none items-center rounded-full bg-white hover:brightness-95 md:px-4 md:py-1 text-[#334DD9] font-bold`}
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
      <div className="rounded-[30px] bg-[#EEF6FF] md:mt-4 md:px-10 md:py-4">
        <p className="mb-2">
          Are you looking to select your competitors?
          <br /> Soon you will be able to do it and get a periodical report
          about all the changes! But first, fill the upper section with all the
          needed informations:
        </p>

        <ul className="ml-4 list-disc space-y-2">
          <li>
            <span className="text-[#705CF6]"> Type the query: </span>From this
            keyword(s) we will scrape all the competitors that will be monitored
            but don’t worry you will be able to modify this list!
          </li>
          <li>
            <span className="text-[#705CF6]">Select the search Engine:</span>{' '}
            What is the SE that you want to use? For example, if you have a
            spanish website, maybe you will want to look for google.es search
            results
          </li>

          <li>
            <span className="text-[#705CF6]">Select the Country:</span> This
            will be the location that will be used to search your input query,
            so think what is the country that we should use.
          </li>
          <li>
            <span className="text-[#705CF6]">Device Selection:</span> Results
            can differ between PC and Mobile so let us know your preferences!{' '}
          </li>
        </ul>
        <p className="mt-2">
          Did you provide all the informations needed? Just click analyse and
          let’s work!{' '}
        </p>
      </div>
    </div>
  );
};

export default Step1;
