// Middleware is used to intercept requests and responses to perform some action,
// like preventing an unauthenticated user from accessing a protected route,
// available only to authenticated users, for instance.
// There are two types of middleware: client-side and server-side.
// The client-side middleware is used to intercept requests and responses on the client-side,
// while the server-side middleware is used to intercept requests and responses on the server-side.

// Next is also known for its backend for frontend (BFF) capabilities,

import { NextRequest, NextResponse } from 'next/server'

const signInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}` // define the url to redirect to if the user is not authenticated

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value // get the token from the cookie, if it exists thats why the ?. operator is used

  if (!token) {
    return NextResponse.redirect(signInUrl, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=17;`,
      },
    }) // redirect to login page if token is not found, and after login redirect back to the page the user was trying to access
  }

  return NextResponse.next() // continue to the next request if token is found
}

export const config = {
  matcher: '/memories/:path*', // match all routes starting with /memories
}
