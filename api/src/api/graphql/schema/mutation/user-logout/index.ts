import { graphqlSchema } from '@src/api/graphql/schema';
import { logout } from '@src/controllers/user';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type Mutation {
    userLogout: Boolean
}

`;

function Resolver(_: unknown, __: {}, { res }: Context) {
  return logout(res);
}

graphqlSchema.resolvers.Mutation.userLogout = Resolver;
