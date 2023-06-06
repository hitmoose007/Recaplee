import { createContext } from 'react';

export const TotalCustomCompetitorsContext = createContext({
  totalCustomCompetitors: 0,
  setTotalCustomCompetitors: (totalCustomCompetitors: number) => {},
});
