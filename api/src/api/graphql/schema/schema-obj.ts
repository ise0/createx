import { User } from '@src/models/user';
import { Request, Response } from 'express';
import { GraphQLScalarType } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

type Resolvers = {
  JSON: GraphQLScalarType;
  Query: Record<string, Function | Record<string, Function>>;
  Mutation: Record<string, Function | Record<string, Function>>;
};

export type Context = {
  req: Request;
  res: Response;
  user?: User;
};

export const graphqlSchema = {
  resolvers: { JSON: GraphQLJSON, Query: {}, Mutation: {} } as Resolvers,
  typeDefs: `
    scalar JSON
  `,
};
