import { createContext } from 'react';
import { useContext, useState } from 'react';

interface SerpContextType {
  serpChanges: number;
  setSerpChanges: React.Dispatch<React.SetStateAction<number>>;
}

export const SerpContext = createContext<SerpContextType>({
  serpChanges: 0,
  setSerpChanges: () => {},
});

export const useSerpContext = (): SerpContextType => useContext(SerpContext);
