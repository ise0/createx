import type http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { graphqlSchema } from './schema';
import { formatError } from './format-error';
import { expressMiddleware } from '@apollo/server/express4';
import { authMiddleware } from '@src/middlewares/auth';

export function getApolloServer(httpServer: http.Server) {
  return new ApolloServer({
    ...graphqlSchema,
    formatError,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
}

export function apolloExpressMiddleware(server: ApolloServer) {
  return expressMiddleware(server, {
    context: async ({ req, res }) => {
      await authMiddleware(req, res);
      return { req, res };
    },
  });
}
