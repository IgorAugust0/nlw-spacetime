// TSX is an extension of JSX, which is an extension of JS that allows you to write HTML inside JS
import { cookies } from 'next/dist/client/components/headers'
import { Blur } from '@/components/Blur'
import { Copyright } from '@/components/Copyright'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { Stripes } from '@/components/Stripes'
import { Profile } from '@/components/Profile'

export default function Home() {
  const isAuthenticated = cookies().has('token') // Check if the token cookie exists in the browser
  return (
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
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
