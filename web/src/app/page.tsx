// TSX é uma extensão do JSX, que é uma extensão do JS que permite escrever HTML dentro do JS
import { Button } from '@/components/Button'
import Image from 'next/image'

export default function Home() {
  return ( 
    <h1>
      Hello World
      <Button title="Igor"/>
      <Button title="Joao"/>
      <Button title="Pedro"/>
    </h1>
  )
}
