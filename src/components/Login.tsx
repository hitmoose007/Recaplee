import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className='h-screen w-screen bg-slate-100'>
    <div className="flex flex-col  items-center justify-center py-52 ">
        <Image 
        src="/logo.svg"
        alt="Picture of the author"
        width={400}
        height={400}

        className="bg-black rounded-[30px] px-10 py-10"
        />

      <div className="" style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <Auth
            providers={['google']}
            onlyThirdPartyProviders={true}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        ) : (
          <p>Account page will go here.</p>
        )}
      </div>
    </div>
</div>
  );
};

export default Login;
