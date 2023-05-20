import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

// Route: GET: /memories   // parameters in TS must have a type defined
export async function memoriesRouteHandler(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc', // sort by createdAt in ascending order
      },
    })

    // map memories to a new array of objects with only the properties we want
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.slice(0, 120).concat('...'), // slice the first 120 characters of the content and add ellipsis
      }
    })
  })

  app.get('/memories/:id', async () => {})
  app.post('/memories/', async () => {})
  app.put('/memories/:id', async () => {})
  app.delete('/memories/:id', async () => {})
}
