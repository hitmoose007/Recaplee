import React from 'react';
import Header from '@/components/Header';
import HelperHeader from '@/components/HelperHeader';
import NewQueryForm from '@/components/LanscapeBanners/NewQueryForm';
import { useState } from 'react';
type Props = {};

const Step1 = (props: Props) => {
 

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

      <NewQueryForm />
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
