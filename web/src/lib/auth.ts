import { cookies } from 'next/dist/client/components/headers'
import decode from 'jwt-decode'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): User {
  const token = cookies().get('token')?.value // get the token from the cookie named 'token' if it exists (can be undefined)

  if (!token) {
    throw new Error('User is not authenticated')
  }

  // const user: User = decode(token) // explicitly declare the variable type
  const user = decode<User>(token) // uses type inference and explicit type casting
  // const user = decode(token) as User // type assertion with 'as' keyword

  return user
}
