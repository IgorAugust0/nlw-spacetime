import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

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
      let excerpt = memory.content
      if (excerpt.length > 120) {
        // if the content is longer than 120 characters, ellipsis it
        excerpt = excerpt.slice(0, 120).concat('...') // slice the first 120 characters of the content and add ellipsis
      }
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt,
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    // validate the request parameters
    const paramsSchema = z.object({
      // id: z.string().uuid(),
      // coerce the id to a number and then coerce it to an integer with constrained input
      id: z.number().or(z.string()).pipe(z.coerce.number()),
    })
    // get the id from the request parameters
    const { id } = paramsSchema.parse(request.params)

    // if the id is not a valid uuid, throw an error
    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })
    return memory
  })
  app.post('/memories', async (request) => {
    // validate the request body
    const bodySchema = z.object({
      content: z
        .string()
        .min(5, { message: 'Deve ter pelo menos 5 caracteres' })
        .max(1000, { message: 'Deve ter no máximo 1000 caracteres' }),
      coverUrl: z.string().url({ message: 'Deve ser uma URL válida' }),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 1,
      },
    })

    return memory
  })
  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.number().or(z.string()).pipe(z.coerce.number()),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z
        .string()
        .min(5, { message: 'Deve ter pelo menos 5 caracteres' })
        .max(1000, { message: 'Deve ter no máximo 1000 caracteres' }),
      coverUrl: z.string().url({ message: 'Deve ser uma URL válida' }),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return memory
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.number().or(z.string()).pipe(z.coerce.number()),
    })
    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
