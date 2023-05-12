import { useState } from 'react';
import useMobileStatus from '@/hooks/useMobileStatus';
import BackButton from '@/components/Layout/BackButton';
import { Nunito } from 'next/font/google';
import DesktopBanner from '@/components/Layout/DesktopBanner';
import MobileBanner from '@/components/Layout/MobileBanner';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
});

function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobileStatus();

  const [page, setPage] = useState<PageView>(PageView.DASHBOARD);
  return (
    <>
      <div className={`${nunito.variable} font-sans `}>
        <PageContext.Provider value={{ page, setPage }}>
          {!isMobile && <DesktopBanner />}
          {isMobile && <MobileBanner />}
          <div className=" mx-6 md:mx-10 my-8">
            <div className="md:mb-1">{!isMobile && <BackButton />}</div>
            <main>{children}</main>
          </div>
        </PageContext.Provider>
      </div>
    </>
  );
}

export default Layout;
