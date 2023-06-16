import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/user';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import PageTitle from './PageTitle';
import useScrollPosition from '@/hooks/useScrollPosition';

type Props = {};

const DesktopBanner = (props: Props) => {
  const { page, setPage } = useContext(PageContext);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { user } = useUserContext();
  const date = new Date(user.renewal_date || '');
  const scrollPosition = useScrollPosition();

  

  return (
    <div
      className="sticky -top-1 z-[1000] w-full rounded-b-2xl px-6 pb-5 pt-3 text-[13px] text-white transition-all duration-100"
      style={{
        background: 'linear-gradient(90deg, #111827 0%, #051840 100%)',
      }}
    >
      <div className="mb-3 flex  justify-between ">
        <Image
          onClick={() => {
            setPage(PageView.DASHBOARD);
            router.push('/dashboard');
          }}
          quality={100}
          src="/logo.svg"
          alt="logo"
          width={150}
          height={35}
          className="hover:cursor-pointer"
        />
        <Image
          quality={100}
          src="/logoutIcon.svg"
          alt="logout icon"
          width={20}
          height={20}
          className=""
        />
      </div>
      {scrollPosition <= 0 && (
        <p className=" flex justify-end font-bold">Monthly Limits:</p>
      )}
      <div className="flex justify-between">
        {scrollPosition <= 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className=" flex-col justify-center space-y-1 ">
              {user.renewal_date && (
                <div className="text-center">
                  Renewal on{' '}
                  <span className="font-bold">{date.toLocaleDateString()}</span>
                </div>
              )}
              <button
                className="h-8 w-40 rounded-full bg-[#705CF6] text-sm font-bold hover:brightness-90"
                onClick={() => {
                  setPage(PageView.SUBSCRIPTION);
                  router.push('/subscribe');
                }}
              >
                {user.renewal_date ? ' Your Subscription' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        )}
        <div
          onClick={() => {
            supabase.auth.signOut();
            router.push('/login');
          }}
          className="  flex flex-col items-end hover:cursor-pointer "
        >
          {user.renewal_date && scrollPosition <= 0 && (
            <>
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
    </div>
  );
};

export default DesktopBanner;
