import React from 'react';
import { useState } from 'react';
import CountrySelect from './CountrySelect';
import { countryDomains } from '../../utils/countryList';
import Image from 'next/image';
import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';
type Props = {};

const NewQueryForm = (props: Props) => {
  const [query, setQuery] = useState('');
  const [isPC, setIsPC] = useState(true);
  const [countryDomain, setCountryDomain] = useState('google.com');
  const [country, setCountry] = useState('SE');

  const { page, setPage } = useContext(PageContext);
  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!query) {
      alert('Please add a query');
      return;
    }
    console.log('SUBMIT');
    console.log(query, isPC, countryDomain, country);

    //fetch

    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ query, isPC, countryDomain, country }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setPage('home/step1');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-between rounded-[30px] bg-[#EEF6FF]  md:mt-4 md:h-[125px] md:px-10 md:pt-4">
        <div className="flex md:space-x-10">
          <div className=" flex-col  md:space-y-2">
            <p>Type the query:</p>
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="rounded-full md:h-[34px] md:w-[245px] md:pl-4"
            />
          </div>

          <div className="md:space-y-2 ">
            <p>Select Search Engine:</p>
            <select
              value={countryDomain}
              onChange={(e) => setCountryDomain(e.target.value)}
              className="rounded-full md:h-[34px] md:w-[190px] md:pl-4"
            >
              {countryDomains.map((countryDomain) => {
                return <option value={countryDomain}>{countryDomain}</option>;
              })}
            </select>
          </div>
          <div className="space-y-2">
            <p>Select Country:</p>
            <CountrySelect country={country} setCountry={setCountry} />
          </div>

          <div className="space flex-col text-[#4B5563] md:space-y-2">
            <p className="text-[#111827]">Select device:</p>
            <div className="flex     ">
              <div
                onClick={() => setIsPC(true)}
                className={` ${
                  isPC && 'border-[3px] border-[#705CF6]'
                } flex cursor-pointer items-center space-x-2 rounded-l-full bg-white hover:brightness-95 md:px-3 md:py-1`}
              >
                <Image
                  src="landscapeIcons/pcIcon.svg"
                  width={25}
                  height={25}
                  alt="mobileIcon"
                />
                <span>PC</span>
              </div>
              <div
                onClick={() => setIsPC(false)}
                className={` ${
                  !isPC && 'border-[3px] border-[#705CF6]'
                } flex cursor-pointer items-center rounded-r-full bg-white hover:brightness-95 md:px-4 md:py-1 `}
              >
                <Image
                  src="landscapeIcons/mobileIcon.svg"
                  width={25}
                  height={25}
                  alt="mobileIcon"
                />
                <p>Mobile</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[#4B5563] md:-mt-8 md:mb-3">
            <span className="font-semibold ">5/20</span> monthly query
            researches used
          </div>
          <button
            type="submit"
            className="flex cursor-pointer justify-center space-x-5 rounded-full bg-[#705CF6] font-bold text-white hover:brightness-90  md:px-12 md:py-2"
          >
            <Image
              src="/landscapeIcons/simpleGlass.svg"
              width={20}
              height={29}
              alt=""
              className="mt-[2px] md:-ml-8"
            />
            <p>Analyse</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewQueryForm;
