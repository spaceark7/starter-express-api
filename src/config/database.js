import { PrismaClient } from '@prisma/client'
import { logger } from '../utils/logger.js'

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ],
})

prismaClient.$on('query', (e) => {
  logger.info('Query: ' + e.query)
})

prismaClient.$on('error', (e) => {
  logger.error('Error: ' + e.message)
})

prismaClient.$on('warn', (e) => {
  logger.warn('Warn: ' + e.message)
})

prismaClient.$on('info', (e) => {
  logger.info('Info: ' + e.message)
})
