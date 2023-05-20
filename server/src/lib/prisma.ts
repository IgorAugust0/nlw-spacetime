import { PrismaClient } from '@prisma/client'

// conexão com o banco de dados
export const prisma = new PrismaClient({
  // emitting logs for all query events/ event-based logging
  // log: ['query', 'info', 'warn', 'error'],
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})
