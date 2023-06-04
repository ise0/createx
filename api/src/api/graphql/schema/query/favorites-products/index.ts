import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getFavoritesProducts } from '@src/controllers/product';

graphqlSchema.typeDefs += `

type FavoritesProducts_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type FavoritesProducts_Response {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [FavoritesProducts_CharacteristicValue!]!
    price: Int!
    price_with_discount: Int
    discount: Float
}

input FavoritesProducts_ProductInput {
    productId: Int! 
    productCharacteristicId: Int 
}

type Query {
    favoritesProducts(products: [FavoritesProducts_ProductInput!]!): [FavoritesProducts_Response!]!
}
`;

function Resolver(
  _: unknown,
  params: { products: { productId: number; productCharacteristicId?: number; quantity: number }[] }
) {
  return graphqlErrorResponseHandler(getFavoritesProducts(params.products));
}

graphqlSchema.resolvers.Query.favoritesProducts = Resolver;
