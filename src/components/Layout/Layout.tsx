import { useState } from 'react';
import useMobileStatus from '@/hooks/useMobileStatus';
import BackButton from '@/components/Layout/BackButton';
import { Nunito } from 'next/font/google';
import Banner from '@/components/Layout/Banner';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
});

function Layout({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<PageView>(PageView.DASHBOARD);
  return (
    <>
      <div className={`${nunito.variable} font-sans`}>
        <PageContext.Provider value={{ page, setPage }}>
          <Banner />
          <div className="md:mx-10 md:my-8">
            <div className="md:mb-1">
              <BackButton />
            </div>
            <main>{children}</main>
          </div>
        </PageContext.Provider>
      </div>
    </>
  );
}

export default Layout;
