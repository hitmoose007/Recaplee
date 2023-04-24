import React from 'react';
import Header from '@/components/Header';
import HelperHeader from '@/components/HelperHeader';
import NewQueryForm from '@/components/LanscapeBanners/NewQueryForm';
import { useState, useEffect, useContext } from 'react';
import QueryCards from '../QueryCards';
import Image from 'next/image';
import Toggle from 'react-toggle';

import 'react-toggle/style.css';

import { PageView } from '@/utils/enums';
import { PageContext } from '@/context/PageContext';
type Props = {};
interface Query {
  query_name?: string;
  country?: string;
  last_update?: Date;
  competitors_tracked?: number;
  new_changes?: number;
}

const Home = (props: Props) => {
  const [queryArray, setQueryArray] = useState<Query[]>([]);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    const fetchQuery = async () => {
      const res = await fetch('/api/getQueries');

      const data = await res.json();

      setQueryArray(data);
    };
    fetchQuery();
    console.log(queryArray);
  }, []);

  if (queryArray.length === 0) {
    return <></>;
  }
  return (
    <div>
      <Header
        svgPath="headerIcons/targetIcon.svg"
        description="Target Queries"
      />
      <HelperHeader
        description={`These are the queries that are currently monitored. We will analyze and report to you the changes that have been made on your competitors’ website.`}
      />

      <div className="flex-wrap rounded-[30px] bg-[#EEF6FF] md:mt-4  md:flex  md:space-x-8 md:space-y-5 md:py-4">
        <Image
          onClick={() => setPage(PageView.STEP1VIEW)}
          className="cursor-pointer hover:brightness-50 md:ml-8 md:mt-5"
          width={180}
          height={160}
          src="/landscapeIcons/addNewBigIcon.svg"
          alt="add new query big icon"
        />

        {queryArray.map((query: Query) => {
          return (
            <QueryCards
              queryTitle={query.query_name || ''}
              countryCode={query.country || ''}
              competitorsTracked={query.competitors_tracked || 0}
              lastUpdate={
                query.last_update
                  ? new Date(query.last_update).toLocaleDateString()
                  : ''
              }
            />
          );
        })}
      </div>
      <div className="flex justify-between  md:mt-6">
        <div>
          <Header
            svgPath="headerIcons/bookIcon.svg"
            description="How Recaplee works?"
          />
          <div className="mt-1">
            <HelperHeader description="In this page you will be able to add new queries or check for any update!" />
          </div>
          <div className="flex  flex-col rounded-[30px] bg-[#EEF6FF] text-customGray md:mt-8 md:w-[61vw] md:p-4 md:py-8">
            <div className="flex items-start space-x-4 md:mb-6 ">
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

            <div className="flex items-start space-x-4 md:mb-6">
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
        <div className="">
          <Header
            svgPath="headerIcons/bookIcon.svg"
            description="Contact & Notifications"
          />
          <div className="mt-1">
            <HelperHeader description="Set your notification preferences or contact us" />
          </div>
          <div className="flex  w-[30vw]   flex-col text-customGray ">
            <div className="rounded-[30px] bg-[#EEF6FF] md:mt-8 md:p-6">
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
                  defaultChecked={isEmailEnabled}
                  onChange={() => setIsEmailEnabled(!isEmailEnabled)}
                  aria-label="No label tag"
                  icons={false}
                  className=" toggle-custom bg-customPurple hover:brightness-90"
                />
              </div>
            </div>
            <div className="rounded-[30px] bg-[#EEF6FF] text-center md:mt-8 md:p-8">
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
    </div>
  );
};

export default Home;
