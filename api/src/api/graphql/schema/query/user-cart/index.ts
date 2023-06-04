import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getUserCart } from '@src/controllers/user-cart';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type UserCart_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type UserCart_Response {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [UserCart_CharacteristicValue!]!
    price: Int!
    price_with_discount: Int
    discount: Float
    quantity: Int!
}

type Query {
    userCart: [UserCart_Response!]!
}
`;

function Resolver(_: unknown, __: unknown, { req }: Context) {
  return graphqlErrorResponseHandler(getUserCart(req));
}

graphqlSchema.resolvers.Query.userCart = Resolver;
