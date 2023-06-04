import pg from 'pg';
import { logger } from '../logger';

export const db = new pg.Pool({
  port: +process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect().then(() => {
  logger.info('successful connection to db');
});
