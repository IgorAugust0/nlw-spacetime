import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

// Route: GET: /memories   // parameters in TS must have a type defined
export async function memoriesRouteHandler(app: FastifyInstance) {
  // before executing the handler of every router, verify if the user is authenticated by its JWT token
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub, // get memories for the user that is logged in
      },
      orderBy: {
        createdAt: 'asc', // sort by createdAt in ascending order
      },
    })

    // map memories to a new array of objectsN with only the properties we want
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

  app.get('/memories/:id', async (request, reply) => {
    // validate the request parameters
    const paramsSchema = z.object({
      // id: z.number().or(z.string()).pipe(z.coerce.number()): coerce the id to a number and then coerce it to an integer with constrained input
      id: z.string().uuid(),
    })
    // get the id from the request parameters
    const { id } = paramsSchema.parse(request.params)

    // if the id is not a valid/unique uuid, throw an error
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    // if the memory is not public and the user is not the owner of the memory, throw an error
    if (!memory.isPublic && memory.userId !== request.user.sub) {
      // throw new Error('Unauthorized')
      return reply.status(401).send()
    }
    return memory
  })

  app.post('/memories', async (request) => {
    // validate the request body
    const bodySchema = z.object({
      // content: z.string(),
      content: z
        .string()
        .min(5, { message: 'Deve ter pelo menos 5 caracteres' })
        .max(1000, { message: 'Deve ter no máximo 1000 caracteres' }),
      coverUrl: z.string().url({ message: 'Deve ser uma URL válida' }),
      // coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    })

    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      // id: z.number().or(z.string()).pipe(z.coerce.number())
      id: z.string().uuid(),
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

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      // throw new Error('Unauthorized')
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
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

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      // z.number().or(z.string()).pipe(z.coerce.number())
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      // throw new Error('Unauthorized')
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
