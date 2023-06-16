import React from 'react';
import { useState } from 'react';
import CountrySelect from './CountrySelect';
import { countryDomains } from '../../utils/countryList';
import Image from 'next/image';
import { useContext } from 'react';
import { FormContext } from '@/context/FormContext';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import DomainSelect from './DomainSelect';
import { useUserContext } from '@/context/user';
import { QueryResultContext } from '../../context/QueryResultContext';
type Props = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const NewQueryForm = ({ setIsLoading, isLoading }: Props) => {
  const { user } = useUserContext();
  const { formState, setFormState } = useContext(FormContext);
  const { queryResult, setQueryResult } = useContext(QueryResultContext);
  const { setPage } = useContext(PageContext);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!formState.query) {
      alert('Please add a query');
      return;
    }

    setIsLoading(true);
    //fetch

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          query: formState.query,
          isPC: formState.isPC,
          countryDomain: formState.countryDomain,
          country: formState.country,
          userId: user?.id,
        }),
      });

      //check if response a 403 error
      const data = await response.json();

      //check if data is error
      if (data.error) {
        alert(data.error);
        setIsLoading(false);
        return;
      }

      setQueryResult(data);

      setPage(PageView.STEP2VIEW);

      console.log(queryResult, ' this is query result');
    } catch (error) {
      console.error(error);
    }
    // setPage('home/step1');
  };
  const handleCountryChange = (newCountry: string) => {
    setFormState({ ...formState, country: newCountry });
  };

  const handleDomainChange = (newDomain: string) => {
    setFormState({ ...formState, countryDomain: newDomain });
  };

  return (
    <form
      className={`${isLoading && 'pointer-events-none animate-pulse'}`}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-center  justify-between space-y-8  rounded-[30px] bg-[#EEF6FF] pt-4 md:mt-4  md:h-[125px] md:flex-row md:space-y-0 md:px-10">
        <div className="flex w-full flex-col p-4 md:w-auto md:flex-row md:p-0  lg:space-x-6 xl:space-x-10">
          <div
            className={`mb-2 min-w-[140px] flex-col space-y-2 text-customBlack md:mb-0 `}
          >
            <p>Type the query:</p>
            <input
              maxLength={200}
              onChange={(e) =>
                setFormState({ ...formState, query: e.target.value })
              }
              type="text"
              className={`${
                isLoading && 'pointer-events-none'
              } h-[34px] w-full  rounded-full pl-4 focus:outline-none `}
            />
          </div>

          <div className="z-50 mb-2 space-y-2 md:z-auto md:mb-0">
            <p className="truncate text-customBlack ">Select Search Engine:</p>
            <DomainSelect
              domain={formState.countryDomain}
              setDomain={handleDomainChange}
            />
          </div>
          <div className="mb-2 w-full space-y-2 text-customBlack md:mb-0 md:w-auto">
            <p>Select Country:</p>
            <CountrySelect
              country={formState.country}
              setCountry={handleCountryChange}
            />
          </div>
          <div className="space flex-col md:space-y-2">
            <p className="text-customBlack">Select device:</p>
            <div className="flex w-full md:w-auto">
              <div
                onClick={() => setFormState({ ...formState, isPC: true })}
                className={` ${
                  formState.isPC
                    ? 'border-[3px] border-[#705CF6]'
                    : 'border-[3px] border-transparent'
                } flex w-1/2 cursor-pointer items-center space-x-2 rounded-l-full bg-white px-3 py-1 hover:brightness-95 md:w-auto`}
              >
                <Image
                  src="landscapeIcons/pcIcon.svg"
                  width={25}
                  height={25}
                  alt="mobileIcon"
                />
                <span className="truncate">PC</span>
              </div>
              <div
                onClick={() => setFormState({ ...formState, isPC: false })}
                className={` ${
                  !formState.isPC
                    ? 'border-[3px] border-[#705CF6]'
                    : 'border-[3px] border-transparent'
                } flex w-1/2 cursor-pointer items-center rounded-r-full bg-white hover:brightness-95 md:w-auto md:px-4 md:py-1 `}
              >
                <Image
                  src="landscapeIcons/mobileIcon.svg"
                  width={25}
                  height={25}
                  alt="mobileIcon"
                />
                <p className="truncate">Mobile</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-end md:w-auto">
          <div className="-mt-8 mb-3 text-[#4B5563] md:hidden lg:block lg:truncate  ">
            <span className="font-bold">
              {user.query_research}/{user.maxResearchQuery}
            </span>{' '}
            monthly query researches used
          </div>
          <button
            type="submit"
            className="mb-8 flex w-full cursor-pointer justify-center space-x-5 rounded-full bg-[#705CF6] px-12 py-2 font-bold text-white hover:brightness-90  md:mb-0 md:w-auto"
          >
            <Image
              src="/landscapeIcons/simpleGlass.svg"
              width={20}
              height={29}
              alt=""
              className="-ml-8 mt-[2px]"
            />
            <p>Analyse</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewQueryForm;
