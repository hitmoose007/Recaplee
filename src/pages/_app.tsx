import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { UserContext, useUserContext } from '@/context/user';

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [page, setPage] = useState(PageView.DASHBOARD);
  const [user, setUser] = useState({});

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <PageContext.Provider value={{ page, setPage }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </PageContext.Provider>
    </SessionContextProvider>
  );
}
