import React from 'react';
import { PageView } from '@/utils/enums';
import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';
type Props = {};

const PageTitle = ({}: Props) => {
  const { page } = useContext(PageContext);
  return (
    <div className="text-xl font-bold  text-white md:pl-12">
      {page === PageView.DASHBOARD && 'Dashboard'}
      {page === PageView.STEP1VIEW && 'Add new Query'}
      {page === PageView.STEP2VIEW && 'Add new Query'}
      {page === PageView.SUMMARYVIEW && 'Query Summary'}
      {page === PageView.COMPETITORVIEW && 'Competitor Analysis'}
    </div>
  );
};

export default PageTitle;
