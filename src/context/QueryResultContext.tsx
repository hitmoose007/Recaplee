import {createContext } from 'react'

export const QueryResultContext = createContext({
    queryResult: null,
    setQueryResult: (queryResult: any) => {}
});