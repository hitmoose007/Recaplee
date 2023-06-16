import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { countries } from '../../utils/countryList';
import { PageContext } from '../../context/PageContext';
import { useContext } from 'react';
import { PageView } from '../../utils/enums';
type props = {
  country: string;
  setCountry: (country: string) => void;
};
export default function CountrySelect({ country, setCountry }: props) {
  const { page } = useContext(PageContext);

  const onSelect = (code: string) => setCountry(code);
  return (

      <ReactFlagsSelect
      className={`${
        (page === PageView.STEP2VIEW || page === PageView.SUMMARYVIEW) &&
        'step2'
      }  w-full  `}
        searchable={true}
        selected={country}
        onSelect={onSelect}
        countries={countries}
      />
   
  );
}
