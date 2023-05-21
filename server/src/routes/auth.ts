import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutesHandler(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    // Parse the request body using the schema above and get the code from it
    const { code } = bodySchema.parse(request.body)

    // Get access token from GitHub API using the code from the request body and the client ID and secret from the environment variables
    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    // Schema for the access token object returned by the GitHub API
    const { access_token } = accessTokenResponse.data

    // Get user info from GitHub API using the access token from the previous step
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    // Schema for the user object returned by the GitHub API
    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(), // name: z.string().nullable() or z.nullable(z.string()) to allow null values
      avatar_url: z.string().url(),
    })

    // Parse the user object returned by the GitHub API using the schema above
    const userInfo = userSchema.parse(userResponse.data)

    // Check if user already exists in the database using the GitHub ID
    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    // If user doesn't exist, create it in the database
    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    // Generate a JWT token for the user
    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id.toString(),
        expiresIn: '30d',
      },
    )

    return {
      token,
    }
  })
}
