import {createContext} from 'react';

export const FormContext = createContext({
    
    formState: {
        query: '',
        country: 'SE',
        countryDomain: 'google.com',
        isPC: true
    },
    setFormState: (formState: any) => {},


});


