import React from 'react';
import Step1View from '../components/HomePageViews/Step1';
import Step2View from '../components/HomePageViews/Step2';
import { FormContext } from '../context/FormContext';
import { useState } from 'react';
import { QueryResultContext } from '../context/QueryResultContext';
import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import DashboardView from '../components/HomePageViews/Dashboard';
type Props = {};

const home = (props: Props) => {
  const [formState, setFormState] = useState({
    query: '',
    country: 'SE',
    countryDomain: 'Google.pk',
    isPC: true,
  });

  const { page } = useContext(PageContext);

  const [queryResult, setQueryResult] = useState([]);

  return (
    <QueryResultContext.Provider value={{ queryResult, setQueryResult }}>
      <FormContext.Provider value={{ formState, setFormState }}>
        {page === PageView.DASHBOARD && <DashboardView />}
        {page === PageView.STEP1VIEW && <Step1View />}
        {page === PageView.STEP2VIEW && <Step2View />}
      </FormContext.Provider>
    </QueryResultContext.Provider>
  );
};

export default home;
