import { NextFunction, Request, Response } from 'express'
import decodedJwtToken from '../helpers/decoded-jwt-token.helper'

const AuthenticateMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      message: 'Informing a token is mandatory',
    })
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    return response.status(401).json({
      message: 'Token invalid.',
    })
  }

  const [schema, token] = parts

  if (!/^Bearer$/i.test(schema)) {
    return response.status(401).json({
      message: 'Token with malformation error.',
    })
  }

  const decoded = await decodedJwtToken(token)

  if (decoded) {
    request.userId = decoded.sub as string
    return next()
  }

  return response.status(401).json({
    message: 'Is not possible authenticate user.',
  })
}

export { AuthenticateMiddleware }

