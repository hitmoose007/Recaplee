import React from 'react';
import useMobileStatus from '@/hooks/useMobileStatus';

import Image from 'next/image';
type Props = {};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="flex h-24 w-full justify-between  text-white"
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

        <div className="flex items-center  justify-between space-x-12 text-sm mr-8 ">
          <div className="flex ">
            <p className="mr-3 font-" >Monthly Limits:</p>
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
          <div className="flex-col justify-center">
            <button
              className="h-[35px] w-[150px] rounded-full bg-[#705CF6] "
              onClick={() => console.log('subscription clicked!')}
            >
              Your Subscription
            </button>
            <div className="">
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
              className=" "
            />
          </div>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}

export default Layout;
