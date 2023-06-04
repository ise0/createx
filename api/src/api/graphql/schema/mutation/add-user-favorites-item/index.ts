import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { addUserFavoritesItem } from '@src/controllers/user-favorites';
import { Context } from '../../schema-obj';

graphqlSchema.typeDefs += `
type AddUserFavoritesItem_CharacteristicValue {
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type AddUserFavoritesItem_Product {
    product_id: Int!
    product_characteristic_id: Int
    product_name: String!
    image_preview: String!
    characteristic_values: [AddUserFavoritesItem_CharacteristicValue!]!
    price: Int!
    discount: Float
}

type AddUserFavoritesItem_Response {
    favorites: [AddUserFavoritesItem_Product!]!
}

type Mutation {
    addUserFavoritesItem(
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
  await graphqlErrorResponseHandler(addUserFavoritesItem(params, req));
  return 'success';
}

graphqlSchema.resolvers.Mutation.addUserFavoritesItem = Resolver;
