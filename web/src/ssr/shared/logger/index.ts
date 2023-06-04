import winston from 'winston';

const { combine, timestamp, prettyPrint } = winston.format;

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'app.log' })],
  exitOnError: false,

  format: combine(timestamp(), prettyPrint()),
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export { logger };
