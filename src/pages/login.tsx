import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const Login = () => {
  const { isLoading, supabaseClient, session } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, isLoading,router]);

  if (isLoading) return <></>;

  if (!session)
    return (
      <div className="h-screen w-screen bg-slate-100">
        <div className="flex flex-col  items-center justify-center pt-10">
          <div className="" style={{ padding: '50px 0 100px 0' }}>
            <Auth
              providers={['google']}
              redirectTo="/"
              supabaseClient={supabaseClient}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          </div>
        </div>
      </div>
    );
};

export default Login;
