import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/user';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import PageTitle from './PageTitle';

type Props = {};

const DesktopBanner = (props: Props) => {
  const { page, setPage } = useContext(PageContext);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { user } = useUserContext();
  const date = new Date(user.renewal_date || '');

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
          {user.renewal_date && (
            <div className="text-center">
              Renewal on{' '}
              <span className="font-bold">{date.toLocaleDateString()}</span>
            </div>
          )}
          <button
            className="h-8 w-40 rounded-full bg-[#705CF6] font-bold hover:brightness-90"
            onClick={() => {
              setPage(PageView.SUBSCRIPTION);
              router.push('/subscribe');
            }}
          >
            {user.renewal_date ? ' Your Subscription' : 'Subscribe Now'}
          </button>
        </div>
        {/* <PageTitle /> */}
      </div>

      <div
        onClick={() => {
          supabase.auth.signOut();
          router.push('/login');
        }}
        className="mr-8 mt-4 flex flex-col items-end hover:cursor-pointer "
      >
        {/* <p className="text-xl">Logout</p> */}

        <Image
          quality={100}
          src="/logoutIcon.svg"
          alt="logout icon"
          width={20}
          height={20}
          className=""
        />
        {user.renewal_date && (
          <>
            <p className="mr-3 font-bold">Monthly Limits:</p>
            <p>
              <span className="text-[#30A3E4]">
                {user.query_monitored}/{user.maxMonitoredQuery}
              </span>{' '}
              query monitored
            </p>
            <p>
              <span className="text-[#6864F3]">
                {user.query_research}/{user.maxResearchQuery}
              </span>{' '}
              query research
            </p>
            <p>
              <span className="text-[#993ED0]">
                {user.competitors_tracked}/{user.maxScrape}
              </span>{' '}
              scrape
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopBanner;
