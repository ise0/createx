declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    DB_HOST: string
    DB_USER: string
    DB_PORT: string
    DB_PASSWORD: string
    DB_NAME: string
    JWT_SECRET: string;
    NEXT_PUBLIC_ENV_MODE: 'production' | 'development'
  }
}
