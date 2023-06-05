import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    userId?: string;
  }
}
export async function middleware(req: NextRequest) {
  // console.log('tuhadi amma')
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req, res });
  // Check if we have a session
  // const response = new NextResponse()
  // console.log('heallo')

  const {
    data: { session },
  } = await supabase.auth.getSession();

//   if (req.nextUrl.pathname.startsWith('/api/logout')) {
//     console.log('logout');
//     const res = await supabase.auth.signOut();
//     console.log(res);

//     const redirectUrl = req.nextUrl.clone();
//     redirectUrl.pathname = '/login';

//     return NextResponse.redirect(redirectUrl);
//   }

  if (req.nextUrl.pathname.startsWith('/login')) {
    // console.log('halwa');
    if (session?.user.email?.endsWith('@gmail.com')) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/';

      //   console.log(redirectUrl, 'the redirect url');
      return NextResponse.redirect(redirectUrl);
    }
  }
  if (req.nextUrl.pathname.startsWith('/api')) {
    // return NextResponse.rewrite(new URL('/about-2', req.url));

    // console.log(session?.user.email);
    //   console.log(session?.user.email)
    if (session?.user.email?.endsWith('@gmail.com')) {
      // console.log('idhr')
      // Authentication successful, forward request to protected route.
      const userId = session.user.id;
      //   console.log(userId, 'the id');

      res.cookies.set('userId', userId);
      // req= userId;
      return res;
    }

    //   console.log('gash')
    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';

    //   console.log('nabi')
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/api/:path*'],
};
