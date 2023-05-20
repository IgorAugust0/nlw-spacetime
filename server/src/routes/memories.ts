import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

// Route: GET: /memories   // parameters in TS must have a type defined
export async function memoriesRouteHandler(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany()
    // const users = await prisma.user.findMany({
    //   select: {
    //     name: true,
    //   },
    // })

    return users
  })
}
