import React from 'react';
import Header from '@/components/Header/Header';
import HelperHeader from '@/components/Header/HelperHeader';
import NewQueryForm from '@/components/LanscapeBanners/NewQueryForm';
import { useState, useEffect, useContext } from 'react';
import QueryCards from '../QueryCards';
import Image from 'next/image';
import Toggle from 'react-toggle';
import { useRouter } from 'next/router';
import 'react-toggle/style.css';
import { useSession } from '@supabase/auth-helpers-react';
import { PageView } from '@/utils/enums';
import { PageContext } from '@/context/PageContext';
import { QuerySummary } from '@/types/my-types';
import Link from 'next/link';
type Props = {};

const Home = (props: Props) => {
  const [queryArray, setQueryArray] = useState<QuerySummary[]>([]);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  // const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { page, setPage } = useContext(PageContext);
  const session = useSession();
  useEffect(() => {
    console.log('the body', session?.user?.id);
    const fetchQuery = async () => {
      try {
        // const res = await fetch('/api/getQueries');//change fetch to add user id in req.body
        // const res
        
        
        let res;
         res = await fetch('/api/getQueries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session?.user?.id,
          }),
        });
        // check if res.status 409 and send another request
        // if (res.status === 209 || res.status === 500) {
        //     console.log('inside forbidden area')
        //   res = await fetch('/api/getQueries', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       userId: session?.user?.id,
        //     }),
        //   });

        // }

        const data = await res.json();

        setQueryArray(data);
      } catch (error) {
        console.error(error);
      }
    };
    setPage(PageView.DASHBOARD);
    if (queryArray.length === 0) {
      setIsLoading(false);
    }
    fetchQuery();
    console.log('inside use effect');
  }, []);

  if (isLoading) {
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

      <div className="mt-4 flex-col   rounded-[30px] bg-[#EEF6FF] py-4 md:flex md:w-auto   md:flex-row md:flex-wrap md:space-x-8 md:space-y-5 md:px-0">
        <Image
          onClick={() => setPage(PageView.STEP1VIEW)}
          className="mx-auto cursor-pointer hover:brightness-50 md:mx-0 md:ml-8 md:mt-5"
          width={180}
          height={160}
          src="/landscapeIcons/addNewBigIcon.svg"
          alt="add new query big icon"
        />

        {Array.isArray(queryArray) &&
          queryArray.map((query: QuerySummary, index) => {
            return (
              <Link key={index} href={`/querySummary/${query.id}`}>
                <QueryCards
                  key={query.id}
                  queryTitle={query.query_name || ''}
                  countryCode={query.country || ''}
                  competitorsTracked={query.competitors_tracked || 0}
                  lastUpdate={
                    query.recent_update
                      ? new Date(query.recent_update).toLocaleDateString()
                      : ''
                  }
                />
              </Link>
            );
          })}
      </div>
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
                  defaultChecked={isEmailEnabled}
                  onChange={() => setIsEmailEnabled(!isEmailEnabled)}
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
    </div>
  );
};

export default Home;
