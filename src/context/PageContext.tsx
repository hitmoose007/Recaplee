import {createContext} from 'react';

export const PageContext = createContext({
    page: '',
    setPage: (page: string) => {}
});

