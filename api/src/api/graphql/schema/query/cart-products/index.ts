import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getCartProducts } from '@src/controllers/product';

graphqlSchema.typeDefs += `

type CartProducts_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type CartProducts_Response {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [CartProducts_CharacteristicValue!]!
    price: Int!
    price_with_discount: Int
    discount: Float
    quantity: Int!
}

input CartProducts_ProductInput {
    productId: Int! 
    productCharacteristicId: Int 
    quantity: Int!
}

type Query {
    cartProducts(products: [CartProducts_ProductInput!]!): [CartProducts_Response!]!
}
`;

function Resolver(
  _: unknown,
  params: { products: { productId: number; productCharacteristicId?: number; quantity: number }[] }
) {
  return graphqlErrorResponseHandler(getCartProducts(params.products));
}

graphqlSchema.resolvers.Query.cartProducts = Resolver;
