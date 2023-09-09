import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRouteHandler } from './routes/memories'
import { authRoutesHandler } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify() // create a new fastify instance

app.register(multipart) // register the multipart plugin

// register the static plugin
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../', 'uploads'), // concatenate the uploads directory with the file name
  prefix: '/uploads', // prefix the URL with /uploads
})

// register the cors plugin
app.register(cors, {
  origin: true,
})

// register the jwt plugin
app.register(jwt, {
  secret:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
})

// register the routes
app.register(authRoutesHandler) // register a separate route for the authentication
app.register(memoriesRouteHandler) // register a separate route for the memories
app.register(uploadRoutes) // register a separate route for the upload

// fastify method to start the server on a specific port
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
