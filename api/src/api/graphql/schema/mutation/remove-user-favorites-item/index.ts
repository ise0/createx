import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getUserFavorites, removeUserFavoritesItem } from '@src/controllers/user-favorites';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `

type RemoveUserFavoritesItem_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type RemoveUserFavoritesItem_Product {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [RemoveUserFavoritesItem_CharacteristicValue!]!
    price: Int!
    discount: Float
}

type RemoveUserFavoritesItem_Response {
    favorites: [RemoveUserFavoritesItem_Product!]!
}

type Mutation {
    removeUserFavoritesItem(
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
  await graphqlErrorResponseHandler(removeUserFavoritesItem(params, req));
  return 'success';
}

graphqlSchema.resolvers.Mutation.removeUserFavoritesItem = Resolver;
