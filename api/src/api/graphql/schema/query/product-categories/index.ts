import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getProductCategories } from '@src/controllers/product';

graphqlSchema.typeDefs += `

type ProductCategories_Response {
    category_id: Int!
    category_name: String!
    childs: [JSON!]
}

type Query {
    productCategories: [ProductCategories_Response!]!
}
`;

function Resolver() {
  return graphqlErrorResponseHandler(getProductCategories());
}

graphqlSchema.resolvers.Query.productCategories = Resolver;
