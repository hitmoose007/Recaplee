import HelperHeader from '@/components/Header/HelperHeader';
import QueryHeader from '@/components/Header/QueryHeader';
import React from 'react';
import Image from 'next/image';
import SubHeader from '@/components/CompetitorAnalysis/SubHeader';
import { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import QueryBanner from '@/components/ChangesBanner/ChangesBanner';
import ExpandedView from '@/components/CompetitorAnalysis/ExpandedView';
type Props = {};

const linkSummary = (props: Props) => {
  const [showExpandedView, setShowExpandedView] = useState(false);
  
  return (
    <>
      <QueryHeader
        highlightedText="hardcodedbcubeagency.com"
        isCompetitor={true}
      />
      <HelperHeader description="Read and analyse all the differences found between two versions. You can compare all the changes made in the web page content." />
      <div className="mt-2 flex justify-between ">
        <div>
          <SubHeader title={'Monitored competitor page: '} />
          <div className="flex space-x-2">
            <a
              href=""
              className=" w-[300px] truncate text-sm font-bold text-customGray hover:underline "
            >
              {' '}
              https://www.fdasfacarandbike.com/research/top-10-b
            </a>
            <Image src="/linkIcon.svg" width={10} height={10} alt="link icon" />
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <SubHeader title={'Expanded view:'} />{' '}
            <Toggle
              defaultChecked={showExpandedView}
              onChange={() => setShowExpandedView(!showExpandedView)}
              aria-label="No label tag"
              icons={false}
              className=" toggle-custom bg-customPurple hover:brightness-90"
            />
          </div>
        </div>
        <QueryBanner />
      </div>

        <ExpandedView/>

    </>
  );
};

export default linkSummary;
