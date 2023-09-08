import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // redirect to the home (root) page and set cookie to expire immediately
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    },
  })
}
