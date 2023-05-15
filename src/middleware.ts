import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
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
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  // const response = new NextResponse()
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;
  console.log(session?.user.email);
  //   console.log(session?.user.email)
  if (session?.user.email?.endsWith('@gmail.com')) {
    // console.log('idhr')
    // Authentication successful, forward request to protected route.
    const userId = session.user.id;
    console.log(userId, 'the id');

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

export const config = {
  matcher: '/api/:path*',
};
