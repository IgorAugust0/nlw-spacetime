import { getUser } from '@/lib/auth'
import Image from 'next/image'
// import Link from 'next/link'

export function Profile() {
  const { name, avatarUrl } = getUser()
  return (
    <div className="flex items-center gap-3 text-left ">
      {/* Next Image don't load external images by default of any adress, it must me specified in next.config */}
      <Image
        alt=""
        src={avatarUrl}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />
      <p className="max-w-[140px] text-sm leading-snug ">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 transition-colors hover:text-red-300"
        >
          Sair
        </a>
      </p>
    </div>
  )
}
