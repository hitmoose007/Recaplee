import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  SessionContextProvider,
  useSession,
} from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import Router from 'next/router';
export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const [page, setPage] = useState(PageView.DASHBOARD);
//   const session = useSession();

   return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <PageContext.Provider value={{ page, setPage }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageContext.Provider>
    </SessionContextProvider>
  );
}
