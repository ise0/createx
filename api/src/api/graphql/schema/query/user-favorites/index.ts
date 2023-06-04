import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getUserFavorites } from '@src/controllers/user-favorites';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type UserFavorites_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type UserFavorites_Response {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [UserFavorites_CharacteristicValue!]!
    price: Int!
    price_with_discount: Int
    discount: Float
}

type Query {
    userFavorites: [UserFavorites_Response!]!
}
`;

function Resolver(_: unknown, __: unknown, { req }: Context) {
  return graphqlErrorResponseHandler(getUserFavorites(req));
}

graphqlSchema.resolvers.Query.userFavorites = Resolver;
