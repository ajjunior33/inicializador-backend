import { Request, Response } from 'express'
import logger from 'src/core/logger'
import { Exception } from './exception.middleware'

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
) {
  logger.error(error)
  if (error instanceof Exception) {
    response.status(error.statusCode).json({
      status: 'error',
      statusCode: error.statusCode,
      message: error.message,
    })

    return
  }

  response.status(500).json({
    status: 'error',
    message: ' Internal server error',
  })
}
