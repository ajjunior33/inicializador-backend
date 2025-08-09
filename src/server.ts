import dotenv from 'dotenv'
import http from 'http'
import app from './app/app'

dotenv.config()

const server = http.createServer(app)

server.listen(8000, () => {
  console.log('server is running')
})
