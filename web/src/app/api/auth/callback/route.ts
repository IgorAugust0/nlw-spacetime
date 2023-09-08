import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value || '/'

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  // redirect to the home (root) page and set the token in a cookie
  const redirectURL = redirectTo ?? new URL('/', request.url) // if redirectTo is not defined, redirect to the home (root) page

  // in seconds
  const cookieExpiration = 60 * 60 * 24 * 30 // 30 days

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiration};`,
    },
  })
}
