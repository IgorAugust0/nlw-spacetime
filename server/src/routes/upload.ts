/**
 * The following approach is not recommended because it will load the entire file into memory
 * and will not work for large files. The ideal solution would be to save on available services
 * like AWS S3, Google Cloud Storage, Azure Blob Storage, Cloudflare R2 Storage, etc.
 */

import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'fs'
import { extname, resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'
// import { pipeline as pump } from 'stream/promises'

const pump = promisify(pipeline) // waits for the pipeline to finish before returning

/**
 * To test the upload route, use the following command in HTTPie or Postman:
 * http POST localhost:3333/upload file@<path-to-file> -f
 */
export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // or 5 * 1024 * 1024 = 5MB
      },
    })

    if (!upload) {
      // throw new Error('No file provided')
      return reply.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/(jpe?g|png|gif|bmp|mp4)$/ // or /^(image|video)\/[a-zA-Z]+/
    const isMimeTypeValid = mimeTypeRegex.test(upload.mimetype) // verify if the mimetype of the file is valid by testing it against the regex

    if (!isMimeTypeValid) {
      // throw new Error('Invalid file type')
      return reply.status(400).send()
    }

    const fileId = randomUUID() // generate a random UUID for the file
    const extension = extname(upload.filename) // or upload.mimetype.split('/')[1], get the extension of the file
    const fileName = fileId.concat(extension) //  or `${fileId}${extension}`, concatenate the UUID with the extension to get the file name

    // create a write stream to the uploads directory, patternizing for different OS with resolve
    const writeStream = createWriteStream(
      resolve(__dirname, '../../', 'uploads', fileName), // concatenate the uploads directory with the file name
    )

    await pump(upload.file, writeStream) // pipe the file to the write stream

    const fullUrl = request.protocol.concat('://', request.hostname) // or `${request.protocol}://${request.hostname}`, get the full URL of the request
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString() // create a new URL with the file name and the full URL of the request

    // return reply.status(201).send({ fileUrl })
    return { fileUrl }
  })
}
