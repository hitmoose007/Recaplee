import { createContext } from 'react';

export const FormContext = createContext({
  formState: {
    query: '',
    country: 'SE',
    countryDomain: '',
    isPC: true,
  },
  setFormState: (formState: any) => {},
});
