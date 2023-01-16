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
            MAIL_FROM: string;
            TYPE_STORAGE: "local" | "s3" | "minio";
            S3_ENDPOINT: string;
            S3_REGION: string;
            S3_ACCESS_KEY: string;
            S3_SECRET_KEY: string;
            S3_BUCKET: string;
        }
    }
    namespace Express {
        interface Request {
            userId?: string | undefined;
        }
    }
}
export { }