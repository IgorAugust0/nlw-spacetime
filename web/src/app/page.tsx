// TSX é uma extensão do JSX, que é uma extensão do JS que permite escrever HTML dentro do JS
export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left */}
      <div className="flex flex-col items-start justify-between px-28 py-16"></div>

      {/* Right */}
      <div className="flex flex-col p-16">
        <div className="flex flex-1 items-center justify-center"></div>
        {/* leading-relaxed = line-height: 1.625; */}
        {/* w-[360px] = width: 360px; */}
        <p className="w-[360px] text-center leading-relaxed">
          Você ainda não registrou nenhuma lembrança, comece a{' '}
          <a href="" className="underline hover:text-gray-50">
            criar agora
          </a>
          !
        </p>
      </div>
    </main>
  )
}
