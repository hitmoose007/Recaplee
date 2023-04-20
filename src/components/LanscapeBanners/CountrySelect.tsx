import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { countries } from '../../utils/countryList';
type props = {
  country: string;
  setCountry: (country: string) => void;
};
export default function CountrySelect({ country, setCountry }: props) {
  const [select, setSelect] = useState('SE');
  const onSelect = (code: string) => setCountry(code);
  console.log('SELECT', select);
  return (
    <div className="trun">
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
