import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { useRouter } from 'next/router';
import PageTitle from './PageTitle';

type Props = {};

const DesktopBanner = (props: Props) => {
  const { page, setPage } = useContext(PageContext);
  const router = useRouter();
  return (
    <div
      className="flex h-40 w-full justify-between  rounded-b-2xl text-white"
      style={{
        background: 'linear-gradient(90deg, #111827 0%, #051840 100%)',
      }}
    >
      <div className="ml-4 flex flex-col items-center justify-center">
        <Image
          onClick={() => {
            setPage(PageView.DASHBOARD);
            router.push('/');
          }}
          quality={100}
          src="/logo.svg"
          alt="logo"
          width={150}
          height={35}
          className="hover:cursor-pointer"
        />
        <div className="mt-3 flex-col justify-center space-y-2 ">
          <div className="text-center">
            Renewal on <span className="font-bold">12-05-23</span>
          </div>
          <button
            className="h-8 w-40 rounded-full bg-[#705CF6] font-bold hover:brightness-90"
            onClick={() => console.log('subscription clicked!')}
          >
            Your Subscription
          </button>
        </div>
        {/* <PageTitle /> */}
      </div>

      <div className="flex-col mt-4 mr-8  flex items-end ">
          {/* <p className="text-xl">Logout</p> */}

          <Image
            quality={100}
            src="/logoutIcon.svg"
            alt="logout icon"
            width={20}
            height={20}
            className=""
          />
        <p className="mr-3 font-bold">Monthly Limits:</p>
        <p>
          <span className="text-[#30A3E4]">10/15 </span> query monitored
        </p>
        <p>
          <span className="text-[#6864F3]">15/30</span> query research
        </p>
        <p>
          <span className="text-[#993ED0]">123/150</span> scrape
        </p>
      </div>
    </div>
  );
};

export default DesktopBanner;
