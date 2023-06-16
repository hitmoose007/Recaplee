import { useState, useEffect } from 'react';
import useMobileStatus from '@/hooks/useMobileStatus';
import BackButton from '@/components/Layout/BackButton';
import { Nunito } from 'next/font/google';
import DesktopBanner from '@/components/Layout/DesktopBanner';
import MobileBanner from '@/components/Layout/MobileBanner';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/user';
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
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!isLoading) {
      if (!session && router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [isLoading, session]);

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        try {
          const res = await fetch('/api/getUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: session?.user?.id,
            }),
          });
          const data = await res.json();
          setUser(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }
  }, [session]);
  if (router.pathname === '/login') {
    return (
      <>
        <div className={`${nunito.variable} font-sans `}>{children}</div>
      </>
    );
  }

  if (session) {
    return (
      <>
        <div className={`${nunito.variable} font-sans text-customGray`}>
          <PageContext.Provider value={{ page, setPage }}>
            {!isMobile && <DesktopBanner />}
            {isMobile && <MobileBanner />}
            <div className=" mx-6 md:my-8 my-6 md:mx-10">
              <div className="md:mb-1">{<BackButton />}</div>
              <main>{children}</main>
            </div>
          </PageContext.Provider>
        </div>
      </>
    );
  }
  return <></>;
}

export default Layout;
