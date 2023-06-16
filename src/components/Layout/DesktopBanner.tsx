import Image from 'next/image';
import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { useRouter } from 'next/router';
import PageTitle from './PageTitle';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import { useUserContext } from '@/context/user';
type Props = {};

const DesktopBanner = (props: Props) => {
  const session = useSession();
  const { page, setPage } = useContext(PageContext);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { user, setUser } = useUserContext();
  const renewalDate = new Date(user.renewal_date || '');

  return (
    <div
      className="flex h-24 w-full justify-between  rounded-b-2xl text-white"
      style={{
        background: 'linear-gradient(90deg, #111827 0%, #051840 100%)',
      }}
    >
      <div className="flex items-center">
        <Image
          onClick={() => {
            setPage(PageView.DASHBOARD);
            router.push('/dashboard');
          }}
          quality={100}
          src="/logo.svg"
          alt="logo"
          width={201}
          height={48}
          className="ml-20 hover:cursor-pointer"
        />
        <PageTitle />
      </div>

      <div className="mr-8 flex  items-center justify-between space-x-12 text-sm ">
        {user.renewal_date && (
          <div className="flex ">
            <p className="mr-3 font-bold">Monthly Limits:</p>
            <div className="flex flex-col ">
              <p>
                <span className="text-[#30A3E4]">
                  {user.query_monitored}/{user.maxMonitoredQuery}{' '}
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
            </div>
          </div>
        )}
        <div className="mt-3 flex-col justify-center space-y-2 ">
          <button
            className="h-[35px] w-[150px] rounded-full bg-[#705CF6] font-bold hover:brightness-90"
            onClick={async () => {
              if (!user.renewal_date) {
                setPage(PageView.SUBSCRIPTION);
                router.push('/subscribe');
              } else {
                const data = await fetch(
                  '/api/checkout_sessions/billing_portal',
                  {
                    method: 'GET',
                  }
                );

                const checkoutSession = await data.json();
                router.push(checkoutSession.url);
              }
            }}
          >
            {user.renewal_date ? 'Your Subscription' : 'Subscribe Now'}
          </button>
          {user.renewal_date && (
            <div className="text-center">
              Renewal on{' '}
              <span className="font-bold">
                {renewalDate.toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            supabase.auth.signOut();
            
          }}
          className="flex justify-center space-x-4 hover:cursor-pointer"
        >
          <p className="text-xl">Logout</p>

          <Image
            quality={100}
            src="/logoutIcon.svg"
            alt="logout icon"
            width={20}
            height={20}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopBanner;
