import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getUserCart, removeUserCartItem } from '@src/controllers/user-cart';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type RemoveUserCartItem_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type RemoveUserCartItem_Product {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [RemoveUserCartItem_CharacteristicValue!]!
    price: Int!
    discount: Float
    quantity: Int!
}

type RemoveUserCartItem_Response {
    cart: [RemoveUserCartItem_Product!]!
}

type Mutation {
    removeUserCartItem(
        productId: Int! 
        productCharacteristicId: Int
    ): String!
}
`;

async function Resolver(
  _: unknown,
  params: { productId: number; productCharacteristicId?: number },
  { req }: Context
) {
  await graphqlErrorResponseHandler(removeUserCartItem(params, req));
  return 'success';
}

graphqlSchema.resolvers.Mutation.removeUserCartItem = Resolver;
