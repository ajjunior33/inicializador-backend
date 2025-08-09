import { Router } from 'express'
import { authController } from './auth.controller'

const authRouter = Router()

authRouter.post('/', authController.store)

export default authRouter
