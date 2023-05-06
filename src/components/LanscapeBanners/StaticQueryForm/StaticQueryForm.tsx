import React from 'react';
import { useContext } from 'react';
import { FormContext } from '@/context/FormContext';
import CountrySelect from '../CountrySelect';
import Image from 'next/image';
import DomainSelect from '../DomainSelect';
type Props = {
  showQuery?: boolean;
};

const StaticQuery = ({ showQuery = true }: Props) => {
  const { formState, setFormState } = useContext(FormContext);
  return (
    <div className=" items-center   rounded-[30px] bg-[#EEF6FF]  inline-flex md:mt-4 md:h-[125px] md:px-10 md:pt-4">
      <div className="flex md:space-x-10">
        {showQuery && (
          <div className=" flex-col  md:space-y-2">
            <p>Your query:</p>
            <input
              value={formState.query}
              type="text"
              className="pointer-events-none rounded-full font-bold text-[#334DD9] md:h-[34px] md:w-[245px] md:pl-4"
            />
          </div>
        )}

        <div className="md:space-y-2 pointer-events-none ">
          <p>Search Engine:</p>
          {/* <select
            value={formState.countryDomain}
            className="pointer-events-none rounded-full font-bold text-[#334DD9] md:h-[34px] md:w-[190px] md:pl-4"
          >
            <option value={formState.countryDomain}>
              {formState.countryDomain}
            </option>
          </select> */}
          <DomainSelect domain={formState.countryDomain} setDomain={() => {}} />
        </div>
        <div className="pointer-events-none space-y-2">
          <p>Country:</p>
          <CountrySelect country={formState.country} setCountry={() => {}} />
        </div>

        <div className="space flex-col text-[#4B5563] md:space-y-2">
          <p className="text-[#111827]">Device:</p>
          <div className="flex ">
            <div
              onClick={() => setFormState({ ...formState, isPC: true })}
              className={` ${
                !formState.isPC && 'hidden'
              } pointer-events-none flex items-center space-x-3 rounded-full bg-white font-bold text-[#334DD9] hover:brightness-95 md:px-4 md:py-1`}
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
              onClick={() => setFormState({ ...formState, isPC: false })}
              className={` ${
                formState.isPC && 'hidden'
              } pointer-events-none flex items-center rounded-full bg-white font-bold text-[#334DD9] hover:brightness-95 md:px-4 md:py-1`}
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
    </div>
  );
};

export default StaticQuery;
