import React from 'react'

import Header from '@/components/Header/Header';
import HelperHeader from '@/components/Header/HelperHeader';
import Image from 'next/image';
import Toggle from 'react-toggle';
import {useEffect} from 'react';
import 'react-toggle/style.css';
import { useSession } from '@supabase/auth-helpers-react';
type Props = {
    isEmailEnabled: boolean;
    setIsEmailEnabled: (value: boolean) => void;
   

}

const InfoPanel = ({isEmailEnabled, setIsEmailEnabled}: Props) => {

  const session = useSession();
  //fetch email enabled
  
  useEffect(() => {
    const fetchEmailEnabled = async () => {

      try {
        let res;
        res = await fetch('/api/enable-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            emailEnabled: isEmailEnabled,
          }),
        });

      } catch (error) {
        console.error(error);
      }
    };
      fetchEmailEnabled();
  }, [isEmailEnabled]);
  return (
      <div className="mt-6 flex  flex-col justify-between  md:flex-row">
        <div>
          <Header
            svgPath="headerIcons/bookIcon.svg"
            description="How Recaplee works?"
          />
          <div className="mt-1">
            <HelperHeader description="In this page you will be able to add new queries or check for any update!" />
          </div>
          <div className="mt-8  flex flex-col rounded-[30px] bg-[#EEF6FF] p-4 py-8 text-customGray md:w-[61vw]">
            <div className="mb-6 flex items-start space-x-4  ">
              <Image
                width={12}
                height={25}
                src="dashboardIcons/number1Icon.svg"
                alt="icon 1 "
                className="inline-block "
              />
              <div className="-mt-1 inline-block">
                <p className="mb-1 text-[20px] font-bold text-customPurple">
                  Add new query
                </p>
                <p>
                  In order to add a new query and monitor it, you can click the{' '}
                  {/* <div className="rounded-[5px] inline-block text-sm  border border-dashed  border-customPurple px-[4px]  "> */}
                  <Image
                    alt="add icon"
                    src="/dashboardIcons/addIcon.svg"
                    width={20}
                    height={20}
                    className="ml-1 mr-1 inline pb-1"
                  />
                  <span className="font-bold text-customPurple ">
                    {' '}
                    Add new Query{' '}
                  </span>
                  button.
                  <br />
                  Type all the needed information and we will find the main
                  competitors for the given keyword to keep under control for
                  content changes.
                  <br />
                  Every 3 days{' '}
                  <span className="font-bold ">
                    we will report any new changes{' '}
                  </span>
                  in position and on the content.
                  {/* </div>{' '} */}
                </p>
              </div>
            </div>

            <div className="mb-6 flex items-start space-x-4">
              <Image
                width={17}
                height={25}
                src="dashboardIcons/number2Icon.svg"
                alt="icon 1 "
                className="inline-block"
              />
              <div className="-mt-1 inline-block">
                <p className="mb-1 text-[20px] font-bold text-customPurple">
                  Query Summary
                </p>
                <p>
                  <span className="font-bold ">By clicking a query </span>
                  in the upper section, you will be able to
                  <span className="font-bold "> have a summary about </span>
                  all the selected
                  <span className="font-bold "> competitors. </span>
                  Did they go up or down? Did they make any changes on the
                  website? We will report these to you!
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 ">
              <Image
                width={17}
                height={25}
                src="dashboardIcons/number3Icon.svg"
                alt="icon 1 "
                className="inline-block"
              />
              <div className="-mt-1 inline-block">
                <p className="mb-1 text-[20px] font-bold text-customPurple">
                  Query Summary
                </p>
                <p>
                  What? Your competitor ranked of 5 positions? Don’t worry, you
                  are helped by Recaplee! In the query summary section,
                  <span className="font-bold">
                    {' '}
                    after the first period of 3 days
                  </span>
                  , you will be able to get an analysis of the content of the
                  selected website comparing all the changes: Did they add any
                  new headings? Is there any new topic that is being talked
                  about?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 ">
          <Header
            svgPath="headerIcons/bookIcon.svg"
            description="Contact & Notifications"
          />
          <div className="md:mt-1">
            <HelperHeader description="Set your notification preferences or contact us" />
          </div>
          <div className="flex flex-col text-customGray   md:mt-0 md:w-[30vw] ">
            <div className="mt-8 rounded-[30px] bg-[#EEF6FF] p-6">
              <p>
                If you do not want to receive any email notification about the
                new updates found for your queries, you can disable it from
                here:
              </p>
              <div className="mt-2 flex justify-between">
                {isEmailEnabled && (
                  <li className=" font-bold">Email Notification Enabled</li>
                )}
                {!isEmailEnabled && (
                  <li className=" font-bold">Email Notification Disabled</li>
                )}
                <Toggle
                  checked={isEmailEnabled}
                  onChange={() => {
                    setIsEmailEnabled(!isEmailEnabled);
                    
                  }}
                  aria-label="No label tag"
                  icons={false}
                  className=" toggle-custom bg-customPurple hover:brightness-90"
                />
              </div>
            </div>
            <div className="mt-8 rounded-[30px] bg-[#EEF6FF] p-8 text-center">
              <p>
                Do you need help or you found a bug?
                <br /> Contact us by writing to:
                <p className="font-bold text-customPurple">
                  {' '}
                  hello@recaplee.com{' '}
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default InfoPanel