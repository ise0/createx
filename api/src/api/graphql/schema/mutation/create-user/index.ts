import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { createUser, logout } from '@src/controllers/user';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type CreateUser_User {
  user_id: Int!
  first_name: String!
  last_name: String
  email: String!
}

type CreateUser_Response {
  token: String!
  user: CreateUser_User!
}

type Mutation {
  createUser( firstName: String!, lastName: String, email: String!, password: String!, rememberMe: Boolean! ): CreateUser_Response!
}

`;

function Resolver(
  _: unknown,
  params: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string; 
    rememberMe: boolean;
  },
  { res }: Context
) {
  return graphqlErrorResponseHandler(createUser(params, res));
}

graphqlSchema.resolvers.Mutation.createUser = Resolver;
