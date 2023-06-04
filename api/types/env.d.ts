declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_COOKIE_EXPIRES_IN: string;
    ALLOWED_ORIGINS: string;
    DB_PORT: string,
    DB_HOST: string,
    DB_NAME: string,
    DB_USER: string,
    DB_PASSWORD: string,
  }
}
