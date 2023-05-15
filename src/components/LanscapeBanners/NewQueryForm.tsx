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
import { QueryResultContext } from '../../context/QueryResultContext';
type Props = {
    setIsLoading : (isLoading : boolean) => void;
};

const NewQueryForm = ({setIsLoading}: Props) => {
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
        }),
      });

      const data = await response.json();
      //   console.log(data, ' this is data');
      console.log(data, ' this is data');

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
    <form onSubmit={onSubmit}>
      <div className="flex flex-col space-y-8 md:space-y-0  md:flex-row items-center  md: justify-between rounded-[30px] bg-[#EEF6FF]  mt-4 md:h-[125px] md:px-10 pt-4">
        <div className="flex md:flex-row flex-col  lg:space-x-6 xl:space-x-10">
          <div className=" flex-col min-w-[140px] space-y-2">
            <p>Type the query:</p>
            <input
              onChange={(e) =>
                setFormState({ ...formState, query: e.target.value })
              }
              type="text"
              className="rounded-full h-[34px]   w-full pl-4 focus:outline-none "
            />
          </div>

          <div className="space-y-2 z-50 md:z-auto  ">
            <p className="truncate ">Select Search Engine:</p>
          
            <DomainSelect domain={formState.countryDomain} setDomain={handleDomainChange}/>
          </div>
          <div className="space-y-2 ">
            <p>Select Country:</p>
            <CountrySelect
              country={formState.country}
              setCountry={handleCountryChange}
            />
          </div>

          <div className="space flex-col text-[#4B5563] md:space-y-2">
            <p className="text-[#111827]">Select device:</p>
            <div className="flex     ">
              <div
                onClick={() => setFormState({ ...formState, isPC: true })}
                className={` ${
                  formState.isPC ? 'border-[3px] border-[#705CF6]' : 'border-[3px] border-transparent'
                } flex cursor-pointer items-center space-x-2 rounded-l-full bg-white hover:brightness-95 px-3 py-1`}
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
                  !formState.isPC ? 'border-[3px] border-[#705CF6]' : 'border-[3px] border-transparent'
                } flex cursor-pointer items-center rounded-r-full bg-white hover:brightness-95 md:px-4 md:py-1 `}
              >
                <Image
                  src="landscapeIcons/mobileIcon.svg"
                  width={25}
                  height={25}
                  alt="mobileIcon"
                />
                <p className='truncate'>Mobile</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[#4B5563] -mt-8 mb-3 md:hidden lg:block lg:truncate  ">
            <span className="font-semibold  ">5/20</span> monthly query
            researches used
          </div>
          <button
            type="submit"
            className="flex cursor-pointer justify-center space-x-5 rounded-full bg-[#705CF6] font-bold text-white hover:brightness-90  px-12 py-2"
          >
            <Image
              src="/landscapeIcons/simpleGlass.svg"
              width={20}
              height={29}
              alt=""
              className="mt-[2px] -ml-8"
            />
            <p>Analyse</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewQueryForm;
