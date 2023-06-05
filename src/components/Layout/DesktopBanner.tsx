import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { useRouter } from 'next/router';
import PageTitle from './PageTitle';
import { signOut } from '@/utils/auth';
import { supabase } from '@/lib/supabase';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCookies } from 'react-cookie';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

type Props = {};

const DesktopBanner = (props: Props) => {
  const session = useSession();
  const { page, setPage } = useContext(PageContext);
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [cookies, setCookies, removeCookie] = useCookies();

  const handleRemoveCookie = () => {
    Object.keys(cookies).forEach((cookieName) => {
      removeCookie(cookieName); // Remove each cookie individually
    });
  };
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
            router.push('/');
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
        <div className="flex ">
          <p className="mr-3 font-bold">Monthly Limits:</p>
          <div className="flex flex-col ">
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
        <div className="mt-3 flex-col justify-center space-y-2 ">
          <button
            className="h-[35px] w-[150px] rounded-full bg-[#705CF6] font-bold hover:brightness-90"
            onClick={() => console.log('subscription clicked!')}
          >
            Your Subscription
          </button>
          <div className="text-center">
            Renewal on <span className="font-bold">12-05-23</span>
          </div>
        </div>
        <div
          onClick={() => {

            // handleRemoveCookie();
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
