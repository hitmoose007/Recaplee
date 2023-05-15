import Header from '@/components/Header/Header';
import React, { useEffect, useState } from 'react';
import QueryHeader from '@/components/Header/QueryHeader';
import StaticQuery from '@/components/LanscapeBanners/StaticQueryForm/StaticQueryForm';
import QueryBanner from '@/components/ChangesBanner/ChangesBanner';
import ChangeCard from '@/components/ChangesBanner/ChangeCard';
import HelperHeader from '@/components/Header/HelperHeader';
import { QuerySummary, Competitor } from '@/types/my-types';
import AnalysisCard from '@/components/AnalysisBanner/AnalysisCard';
import { useRouter } from 'next/router';
import Summary from '@/components/QueryViews/Summary';

import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import CompetitorAnalysis from '@/components/QueryViews/CompetitorAnalysis';
type Props = {};

const querySummary = (props: Props) => {
  const [querySummary, setQuerySummary] = useState<QuerySummary>();
  const [loading, setLoading] = useState(true);
  const [competitorArray, setCompetitorArray] = useState<Competitor[]>([]);

  const [competitorAnalysed, setCompetitorAnalysed] = useState<Competitor>();
  const { page, setPage } = React.useContext(PageContext);
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    if (id !== undefined) {
      async function fetchQuerySummary() {
        const res = await fetch(`/api/getQuerySummary/${id}`);
        const json = await res.json();
        setQuerySummary(json.querySummary);
        setCompetitorArray(json.competitors);
      }
      fetchQuerySummary();
    }
  }, [router]);

  useEffect(() => {
    if (querySummary) {
      setLoading(false);
    }
    setPage(PageView.SUMMARYVIEW);
  }, [querySummary]);

  if (loading) {
    return <></>;
  }
  if (page === PageView.SUMMARYVIEW && querySummary)
    return (
      <>
        <Summary
          setCompetitorAnalysed={setCompetitorAnalysed}
          querySummary={querySummary}
          competitorArray={competitorArray}
        />
      </>
    );

  if (page === PageView.COMPETITORVIEW && querySummary && competitorAnalysed)
    return (
      <CompetitorAnalysis
        competitorAnalysed={competitorAnalysed}
        querySummary={querySummary}
      />
    );
};

export default querySummary;
