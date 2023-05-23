export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      {/* leading-relaxed = line-height: 1.625; w-[360px] = width: 360px; */}
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <a href="" className="underline transition-colors hover:text-gray-50">
          criar agora
        </a>
        !
      </p>
    </div>
  )
}
