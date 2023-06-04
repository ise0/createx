import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getUserCartFavIds } from '@src/controllers/user';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type UserCartFavIds_Id {
    product_id: Int!
    product_characteristic_id: Int
}

type UserCartFavIds_Response {
    cart: [UserCartFavIds_Id!]!
    fav: [UserCartFavIds_Id!]!
}

type Query {
    userCartFavIds: UserCartFavIds_Response!
}
`;

function Resolver(_: unknown, __: unknown, { req }: Context) {
  return graphqlErrorResponseHandler(getUserCartFavIds(req));
}

graphqlSchema.resolvers.Query.userCartFavIds = Resolver;
