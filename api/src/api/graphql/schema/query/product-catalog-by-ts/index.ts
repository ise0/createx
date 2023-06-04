import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getProductCatalogByTS } from '@src/controllers/product';

graphqlSchema.typeDefs += `

type ProductCatalogByTS_ProductAttribute {
    attribute_type_id: Int!
    attribute_name: String!
    attribute_value: JSON!
    attribute_view: JSON!
}

type ProductCatalogByTS_ProductCharacteristicValue{
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type ProductCatalogByTS_ProductCharacteristic {
    characteristic_id: Int!
    product_variant_id: Int
    characteristic_values: [ProductCatalogByTS_ProductCharacteristicValue!]!
}

type ProductCatalogByTS_ProductVariant {
    product_variant_id: Int!
    sku: String!
    image_preview: String
    images: [String!]!
}

type ProductCatalogByTS_Prices {
    characteristic_id: Int
    price: Int!
    price_with_discount: Int
    discount: Int
}

type ProductCatalogByTS_ProductResponse {
    product_id: Int!
    requested_variant_id: Int
    product_name: String!
    rating: Int!
    description: String
    prices: [ProductCatalogByTS_Prices!]!
    product_attributes: [ProductCatalogByTS_ProductAttribute!]!
    product_characteristics: [ProductCatalogByTS_ProductCharacteristic!]!
    product_variants: [ProductCatalogByTS_ProductVariant!]!
}

type ProductCatalogByTS_TagFilterValue {
    tag: String!
    tag_view: JSON!
    elements_number: Int!
}

type ProductCatalogByTS_TagFilter {
    filter_id: String!
    filter_name: String!
    tags:  [ProductCatalogByTS_TagFilterValue!]!
}

type ProductCatalogByTS_PriceFilter {
    min: Int!
    max: Int!
}

type ProductCatalogByTS_Filters {
    tag_filters: [ProductCatalogByTS_TagFilter!]!
    price_filter: ProductCatalogByTS_PriceFilter!
}


type ProductCatalogByTS_Sort {
    id: Int!
    name: String!
}

type ProductCatalogByTS_Response {
    elements_number: Int!
    elements: [ProductCatalogByTS_ProductResponse!]!
    filters: ProductCatalogByTS_Filters!
    sort: [ProductCatalogByTS_Sort!]!
}



input ProductCatalogByTS_TagFilterInput {
    filterId: String!
    tags: [String!]!
}

input ProductCatalogByTS_PriceFilterInput {
    start: Int!
    end: Int!
}

input ProductCatalogByTS_FiltersInput {
    tagFilters: [ProductCatalogByTS_TagFilterInput!]!
    priceFilter: ProductCatalogByTS_PriceFilterInput
}


input ProductCatalogByTS_PaginationInput {
    offset: Int!
    limit: Int! 
}



type Query {
    productCatalogByTS(
        filters: ProductCatalogByTS_FiltersInput!, 
        sort: Int,
        textSearch: String!, 
        pagination: ProductCatalogByTS_PaginationInput!
    ): ProductCatalogByTS_Response!
}
`;

type GetProductCategoryParams = {
  filters: {
    tagFilters: { filterId: string; tags: string[] }[];
    priceFilter: { start: number; end: number };
  };
  sort?: number;
  textSearch: string;
  pagination: { offset: number; limit: number };
};

function Resolver(_: unknown, params: GetProductCategoryParams) {
  return graphqlErrorResponseHandler(getProductCatalogByTS(params));
}
graphqlSchema.resolvers.Query.productCatalogByTS = Resolver;
