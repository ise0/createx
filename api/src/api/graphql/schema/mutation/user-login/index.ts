import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { login } from '@src/controllers/user';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type UserLogin_User {
    user_id: Int!
    first_name: String!
    last_name: String
    email: String!
}

type UserLogin_Response {
    token: String!
    user: UserLogin_User!
}

type Mutation {
    userLogin(email: String!, password: String!, rememberMe: Boolean!): UserLogin_Response!
}
`;

async function Resolver(
  _: unknown,
  params: { email: string; password: string; rememberMe: boolean },
  { res }: Context
) {
  return graphqlErrorResponseHandler(await login(params, res));
}
graphqlSchema.resolvers.Mutation.userLogin = Resolver;
