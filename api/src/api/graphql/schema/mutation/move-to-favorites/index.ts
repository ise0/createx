import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { moveToFav, getUserCart } from '@src/controllers/user-cart';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type MoveToFavorites_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type MoveToFavorites_Product {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [MoveToFavorites_CharacteristicValue!]!
    price: Int!
    discount: Float
    quantity: Int!
}

type MoveToFavorites_Response {
    cart: [MoveToFavorites_Product!]!
}

type Mutation {
    moveToFavorites(
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
  await graphqlErrorResponseHandler(moveToFav(params, req));
  return 'success';
}

graphqlSchema.resolvers.Mutation.moveToFavorites = Resolver;
