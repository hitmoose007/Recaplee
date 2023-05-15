import { useState, useEffect } from 'react';
import useMobileStatus from '@/hooks/useMobileStatus';
import BackButton from '@/components/Layout/BackButton';
import { Nunito } from 'next/font/google';
import DesktopBanner from '@/components/Layout/DesktopBanner';
import MobileBanner from '@/components/Layout/MobileBanner';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { useRouter } from 'next/router';
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from '@supabase/auth-helpers-react';
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
});

function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobileStatus();
  const { session, isLoading } = useSessionContext();
  const router = useRouter();
  const [page, setPage] = useState<PageView>(PageView.DASHBOARD);
  useEffect(() => {
    if (!isLoading) {
      if (!session && router.pathname !== '/login') {
        router.push('/login');
      }
    }
    console.log('eah');
  }, [isLoading, session]);

  //   useEffect(() => {
  //     //cause page refresh anyways
  //     router.push('/');
  //   }, [router]);
  if (router.pathname === '/login') {
    return (
      <>
        <div className={`${nunito.variable} font-sans `}>{children}</div>
      </>
    );
  }

  //   console.log(session, 'session')

  //   if (!session) {
  //     return <></>;
  //   }
  //   console.log(session)
  if (session)
    return (
      <>
        <div className={`${nunito.variable} font-sans `}>
          <PageContext.Provider value={{ page, setPage }}>
            {!isMobile && <DesktopBanner />}
            {isMobile && <MobileBanner />}
            <div className=" mx-6 my-8 md:mx-10">
              <div className="md:mb-1">{!isMobile && <BackButton />}</div>
              <main>{children}</main>
            </div>
          </PageContext.Provider>
        </div>
      </>
    );

  return <></>;
}

export default Layout;
