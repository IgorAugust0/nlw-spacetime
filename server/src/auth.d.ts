import '@fastify/jwt'
// https://github.com/fastify/fastify-jwt#typescript
declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    } // user type is return type of `request.user` object
  }
}
