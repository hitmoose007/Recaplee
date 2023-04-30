import Header from '@/components/Header/Header';
import React from 'react';
import QueryHeader from '@/components/Header/QueryHeader';
import StaticQuery from '@/components/LanscapeBanners/StaticQueryForm/StaticQueryForm';
import QueryBanner from '@/components/ChangesBanner/ChangesBanner';
type Props = {};

const querySummary = (props: Props) => {
  return (
    <>
      <QueryHeader />
      <div className='md:flex md:justify-between'>
        <StaticQuery showQuery={false} />
        <QueryBanner/>
      </div>
    </>
  );
};

export default querySummary;
