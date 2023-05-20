import fastify from 'fastify'
import { memoriesRouteHandler } from './routes/memories'

// fastify instance
const app = fastify()
// fastify method to register a seoarate route file/handler
app.register(memoriesRouteHandler)

// fastify method to start the server on a specific port
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
