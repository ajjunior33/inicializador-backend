declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      NODE_ENV: 'dev' | 'prod' | 'homolog'
    }
  }
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}
export { }

