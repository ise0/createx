import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { moveToCart, getUserFavorites } from '@src/controllers/user-favorites';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `
type MoveToCart_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type MoveToCart_Product {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [MoveToCart_CharacteristicValue!]!
    price: Int!
    discount: Float
}

type MoveToCart_Response {
    favorites: [MoveToCart_Product!]!
}

type Mutation {
    moveToCart(
        productId: Int! 
        productCharacteristicId: Int
    ): String!
}
`;

async function Resolver(
  _: unknown,
  params: { productId: number; productCharacteristicId?: number; quantity: number },
  { req }: Context
) {
  await graphqlErrorResponseHandler(moveToCart(params, req));
  return 'success';
}

graphqlSchema.resolvers.Mutation.moveToCart = Resolver;
