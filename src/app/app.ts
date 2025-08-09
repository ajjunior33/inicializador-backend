import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import authRouter from './contexts/auth/auth.router'
import userRouter from './contexts/user/user.router'
import { errorHandler } from './middleware/error-handler.middleware'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (_: Request, response: Response) => {
  return response.status(200).json({
    health: true,
  })
})

const routes = express.Router()

routes.use('/auth', authRouter)
routes.use('/user', userRouter)

routes.use(errorHandler)

export default app
