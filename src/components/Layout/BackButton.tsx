import React from 'react';
import Image from 'next/image';
import { PageView } from '@/utils/enums';
import { PageContext } from '@/context/PageContext';
import { useContext } from 'react';

import { useRouter } from 'next/router';
type Props = {};

const BackButton = (props: Props) => {
  const router = useRouter();

  const { page, setPage } = useContext(PageContext);

  const onClick = () => {
    if (page === PageView.STEP1VIEW) {
      setPage(PageView.DASHBOARD);
    }

    if (page === PageView.STEP2VIEW) {
      setPage(PageView.STEP1VIEW);
    }

    if (page === PageView.SUMMARYVIEW) {
      setPage(PageView.DASHBOARD);
      router.push('/dashboard');
    }

    if (page === PageView.COMPETITORVIEW) {
      setPage(PageView.SUMMARYVIEW);
    }
  };

  if (page === PageView.DASHBOARD) {
    return <></>;
  }
  return (
    <div className="md:mb-4 mb-2 flex  items-center justify-between md:w-[75px] ">
      <button onClick={() => onClick()}>
        <Image
          src="/backButton.svg"
          alt="back"
          width={25}
          height={25}
          className="hover:brightness-75"
        />
      </button>
      <p className="text-[#4B5563] md:block hidden ">Back</p>
    </div>
  );
};

export default BackButton;
