// JSX: An extension of JavaScript for writing HTML-like code within JS.
// Commonly used with libraries like React for building UI components.

// TSX: Similar to JSX, but used with TypeScript, a statically-typed superset of JS.
// Provides type checking for enhanced code quality and error prevention.

// They're commonly used with libraries like React to define the structure
// of user interfaces in a more declarative and component-based way

import './globals.css'
import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Blur } from '@/components/Blur'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Stripes } from '@/components/Stripes'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/dist/client/components/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'A time capsule build with React, Next.js, TailwindCSS and TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token') // Check if the token cookie exists in the browser, that is, if the user is authenticated
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] px-28 py-16">
            <Blur />
            <Stripes />
            {isAuthenticated ? <Profile /> : <SignIn />}{' '}
            {/* If the user is authenticated, show the memories, otherwise show the sign in form */}
            <Hero />
            <Copyright />
          </div>

          {/* Right */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children} {/* content from each page */}
          </div>
        </main>
      </body>
    </html>
  )
}
