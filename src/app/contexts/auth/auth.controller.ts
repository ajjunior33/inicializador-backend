import { NextFunction, Request, Response } from 'express'
import { authService } from './auth.service'
class AuthController {
  public async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body
      const handler = await authService.createSession({ email, password })

      return response.status(200).json(handler)
    } catch (err) {
      next(err)
    }
  }
}

export const authController = new AuthController()
