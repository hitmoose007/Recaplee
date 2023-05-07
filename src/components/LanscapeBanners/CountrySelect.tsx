import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { countries } from '../../utils/countryList';
import {PageContext} from '../../context/PageContext';
import { useContext } from 'react';
import { PageView } from '../../utils/enums';
type props = {
  country: string;
  setCountry: (country: string) => void;
};
export default function CountrySelect({ country, setCountry }: props) {
    const { page } = useContext(PageContext);

  const [select, setSelect] = useState('SE');
  const onSelect = (code: string) => setCountry(code);
  return (
    <div
        className={`${page === PageView.STEP2VIEW && 'step2'}`}
        >
      <ReactFlagsSelect
        selected={country}
        onSelect={onSelect}
        countries={countries}
      />
      <br />

      {/* <div className="react-tel-input flag us"></div> */}
    </div>
  );
}
