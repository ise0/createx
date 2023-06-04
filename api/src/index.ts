import './app';
import { logger } from './shared/logger';

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  logger.error(error);
  console.log(error);
  process.exit(1);
});