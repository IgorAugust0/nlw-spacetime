import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRouteHandler } from './routes/memories'
import { authRoutesHandler } from './routes/auth'

// fastify instance
const app = fastify()
app.register(cors, {
  origin: true,
})
// fastify method to register a separate route for the auth
app.register(authRoutesHandler)
// fastify method to register a separate route for the memories
app.register(memoriesRouteHandler)

// fastify method to start the server on a specific port
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
