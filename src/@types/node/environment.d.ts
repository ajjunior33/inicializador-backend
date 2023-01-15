declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            NODE_ENV: string;
            SECRET_KEY:string;
            HASH_APP: string;
            DATABASE_URL: string;
            MAIL_HOST: string;
            MAIL_PORT: string;
            MAIL_USER: string;
            MAIL_PASS: string;
        }
    }
    namespace Express {
        interface Request {
            userId?: string | undefined;
        }
    }
}
export { }