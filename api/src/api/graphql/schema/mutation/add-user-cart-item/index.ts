import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { addUserCartItem, getUserCart } from '@src/controllers/user-cart';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type AddUserCartItem_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type AddUserCartItem_Product {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [AddUserCartItem_CharacteristicValue!]!
    price: Int!
    discount: Float
    quantity: Int!
}

type AddUserCartItem_Response {
    cart: [AddUserCartItem_Product!]!
}

type Mutation {
    addUserCartItem(
        productId: Int! 
        productCharacteristicId: Int 
        quantity: Int!
    ): String!
}
`;

async function Resolver(
  _: unknown,
  params: { productId: number; productCharacteristicId?: number; quantity: number },
  { req }: Context
) {
  await graphqlErrorResponseHandler(addUserCartItem(params, req));
  return 'success';
}

graphqlSchema.resolvers.Mutation.addUserCartItem = Resolver;
