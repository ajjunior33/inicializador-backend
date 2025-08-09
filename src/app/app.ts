import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
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

routes.use(errorHandler)

export default app
