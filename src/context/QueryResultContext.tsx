import { createContext } from 'react';

export const QueryResultContext = createContext({
  queryResult: [],
  setQueryResult: (queryResult: any) => {},
});
