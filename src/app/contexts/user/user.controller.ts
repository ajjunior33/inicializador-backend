import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'

class UserController {
  public async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password } = request.body
      const handler = await userService.createUser({ name, email, password })
      return response.status(200).json(handler)
    } catch (err) {
      next(err)
    }
  }
}

export const userController = new UserController()
