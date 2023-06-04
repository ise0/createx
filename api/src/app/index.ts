import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import { apolloExpressMiddleware, getApolloServer } from '@src/api/graphql';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { logger } from '@src/shared/logger';

const app = express();

app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGINS.split(' ') }), cookieParser());
app.use('/assets', express.static(path.resolve('public')));

const httpServer = http.createServer(app);

const apolloServer = getApolloServer(httpServer);
apolloServer.start().then(() => {
  app.use('/api/graphql', bodyParser.json(), apolloExpressMiddleware(apolloServer));
});

async function init() {
  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
  logger.info(`Server ready at http://localhost:${process.env.PORT}/`);
}

init(); 
