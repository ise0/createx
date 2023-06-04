import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getUser } from '@src/controllers/user';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type User_Response {
    user_id: Int!
    first_name: String!
    last_name: String
    email: String!
}

type Query {
    user: User_Response
}
`;

function Resolver(_: unknown, __: {}, { req }: Context) {
  return graphqlErrorResponseHandler(getUser(req));
}

graphqlSchema.resolvers.Query.user = Resolver;
