declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      NODE_ENV: 'dev' | 'prod' | 'homolog'
      DATABASE_URL: string
    }
  }
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}
export { }

