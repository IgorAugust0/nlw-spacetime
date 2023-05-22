import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRouteHandler } from './routes/memories'
import { authRoutesHandler } from './routes/auth'

// fastify instance
const app = fastify()
app.register(cors, {
  origin: true,
})

// register the jwt plugin
app.register(jwt, {
  secret:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
})

// fastify method to register a separate route for the auth
app.register(authRoutesHandler)
// fastify method to register a separate route for the memories
app.register(memoriesRouteHandler)

// fastify method to start the server on a specific port
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
