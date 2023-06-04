import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getProduct } from '@src/controllers/product';

graphqlSchema.typeDefs += `
type Product_Attribute {
    attribute_type_id: Int!
    attribute_name: String!
    attribute_value: JSON!
    attribute_view: JSON!
}

type Product_FeatureValue{
    feature_type_id: Int!
    feature_name: String!
    feature_value: JSON!
    feature_view: JSON!
}

type Product_Feature {
    feature_id: Int!
    product_variant_id: Int
    price: Float!
    discount: Int
    feature_values: [Product_FeatureValue!]!
}

type Product_Variant {
    variant_id: Int!
    sku: String!
    image_preview: String
    images: [String!]!
}

type Product_Response {
    product_id: Int!
    requested_variant_id: Int
    product_name: String!
    rating: Int!
    description: String
    price: Int!
    price_with_discount: Int
    discount: Int
    product_attributes: [Product_Attribute!]!
    product_features: [Product_Feature!]!
    product_variants: [Product_Variant!]!
}

type Query {
    product(productId: Int!): Product_Response
}
`;

function Resolver(_: unknown, params: { productId: number }) {
  return graphqlErrorResponseHandler(getProduct(params.productId));
}

graphqlSchema.resolvers.Query.product = Resolver;
