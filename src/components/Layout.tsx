import React from 'react';
import useMobileStatus from '@/hooks/useMobileStatus';
import BackButton from '@/components/BackButton';
import Image from 'next/image';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
});
type Props = {};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`${nunito.variable} font-sans`}>
        <div
          className="flex h-24 w-full justify-between  rounded-b-2xl text-white"
          style={{
            background: 'linear-gradient(90deg, #111827 0%, #051840 100%)',
          }}
        >
          <div className="flex items-center">
            <Image
              quality={100}
              src="/logo.svg"
              alt="logo"
              width={201}
              height={48}
              className="ml-20 "
            />
            <div className="text-xl font-bold  text-white md:pl-12">
              Add new Query
            </div>
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
            <div className="flex justify-center space-x-4">
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
        <div className="md:mx-10 md:my-8">
          <div className="md:mb-1">
            <BackButton />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout;
