import { createContext } from 'react';
import { PageView } from '@/utils/enums';
interface PageContextType {
  page: PageView;
  setPage: (page: PageView) => void;
}

export const PageContext = createContext<PageContextType>({
  page: PageView.STEP1VIEW,
  setPage: () => {},
});
