import React from 'react';
import { useContext } from 'react';
import { FormContext } from '@/context/FormContext';
import CountrySelect from '../CountrySelect';
import Image from 'next/image';
import DomainSelect from '../DomainSelect';
import { QuerySummary } from '@/types/my-types';
type Props = {
  isQuerySummaryPage?: boolean;
  querySummary?: QuerySummary;
};

const StaticQuery = ({ querySummary, isQuerySummaryPage = false }: Props) => {
  const { formState, setFormState } = useContext(FormContext);

  return (
    <div className="mt-4 inline-flex w-full md:w-fit items-center rounded-[30px] bg-[#EEF6FF] px-6  py-4 pt-4  text-customBlack md:h-[100px] md:py-0 md:pt-4">
      <div className="flex w-full flex-col md:flex-row md:space-x-10">
        {!isQuerySummaryPage && (
          <div className=" flex-col  space-y-2 py- md:py-0">
            <p>Your query:</p>
            <input
              value={
                isQuerySummaryPage ? querySummary?.query_name : formState.query
              }
              type="text"
              className="pointer-events-none  h-[34px] w-full rounded-full pl-4 font-bold text-[#334DD9]"
            />
          </div>
        )}

        <div className=" pointer-events-none   space-y-2 md:py-0 py-2">
          <p className="">Search Engine:</p>
          <DomainSelect
            domain={
              isQuerySummaryPage
                ? querySummary?.google_domain || ''
                : formState.countryDomain || ''
            }
            setDomain={() => {}}
          />
        </div>
        <div className="pointer-events-none space-y-2 md:py-0 py-2 ">
          <p>Country:</p>
          <CountrySelect
            country={
              isQuerySummaryPage
                ? querySummary?.country || ''
                : formState.country || ''
            }
            setCountry={() => {}}
          />
        </div>

        <div className=" flex-col space-y-2 text-[#4B5563]">
          <p className="text-[#111827]">Device:</p>
          <div className="flex ">
            <div
              onClick={() => setFormState({ ...formState, isPC: true })}
              className={` ${
                isQuerySummaryPage
                  ? !querySummary?.is_pc && 'hidden'
                  : !formState.isPC && 'hidden'
              } pointer-events-none flex items-center space-x-3 rounded-full bg-white px-4 py-1 font-bold text-[#334DD9] hover:brightness-95`}
            >
              <Image
                src="/landscapeIcons/pcIcon.svg"
                width={25}
                height={25}
                alt="mobileIcon"
              />
              <span>PC</span>
            </div>
            <div
              onClick={() => setFormState({ ...formState, isPC: false })}
              className={` ${
                isQuerySummaryPage
                  ? querySummary?.is_pc && 'hidden'
                  : formState.isPC && 'hidden'
              } pointer-events-none flex items-center rounded-full bg-white px-4 py-1 font-bold text-[#334DD9] hover:brightness-95`}
            >
              <Image
                src="/landscapeIcons/mobileIcon.svg"
                width={25}
                height={25}
                alt="mobileIcon"
              />
              <p>Mobile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticQuery;
