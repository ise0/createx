import { graphqlSchema } from '@src/api/graphql/schema';
import { graphqlErrorResponseHandler } from '@src/api/lib/graphql-async-response-resolver';
import { getProductCatalogByCategoryId } from '@src/controllers/product';

graphqlSchema.typeDefs += `

type ProductCatalogByCategoryId_ProductAttribute {
    attribute_type_id: Int!
    attribute_name: String!
    attribute_value: JSON!
    attribute_view: JSON!
}

type ProductCatalogByCategoryId_ProductCharacteristicValue{
    characteristic_type_id: Int!
    characteristic_name: String!
    characteristic_value: JSON!
    characteristic_view: JSON!
}

type ProductCatalogByCategoryId_ProductCharacteristic {
    characteristic_id: Int!
    product_variant_id: Int
    characteristic_values: [ProductCatalogByCategoryId_ProductCharacteristicValue!]!
}

type ProductCatalogByCategoryId_ProductVariant {
    product_variant_id: Int!
    sku: String!
    image_preview: String
    images: [String!]!
}

type ProductCatalogByCategoryId_Prices {
    characteristic_id: Int
    price: Int!
    price_with_discount: Int
    discount: Int
}

type ProductCatalogByCategoryId_Product {
    product_id: Int!
    requested_variant_id: Int
    product_name: String!
    rating: Int!
    prices: [ProductCatalogByCategoryId_Prices!]!
    description: String
    product_attributes: [ProductCatalogByCategoryId_ProductAttribute!]!
    product_characteristics: [ProductCatalogByCategoryId_ProductCharacteristic!]!
    product_variants: [ProductCatalogByCategoryId_ProductVariant!]!
}

type ProductCatalogByCategoryId_TagFilterValue {
    tag: String!
    tag_view: JSON!
    elements_number: Int!
}

type ProductCatalogByCategoryId_TagFilter {
    filter_id: String!
    filter_name: String!
    tags:  [ProductCatalogByCategoryId_TagFilterValue!]!
}

type ProductCatalogByCategoryId_PriceFilter {
    min: Int!
    max: Int!
}

type ProductCatalogByCategoryId_Filters {
    tag_filters: [ProductCatalogByCategoryId_TagFilter!]!
    price_filter: ProductCatalogByCategoryId_PriceFilter!
}


type ProductCatalogByCategoryId_Sort {
    id: Int!
    name: String!
}

type ProductCatalogByCategoryId_Response {
    elements_number: Int!
    elements: [ProductCatalogByCategoryId_Product!]!
    filters: ProductCatalogByCategoryId_Filters!
    sort: [ProductCatalogByCategoryId_Sort!]!
}



input ProductCatalogByCategoryId_TagFilterInput {
    filterId: String!
    tags: [String!]!
}

input ProductCatalogByCategoryId_PriceFilterInput {
    start: Int!
    end: Int!
}

input ProductCatalogByCategoryId_FiltersInput {
    tagFilters: [ProductCatalogByCategoryId_TagFilterInput!]!
    priceFilter: ProductCatalogByCategoryId_PriceFilterInput
}


input ProductCatalogByCategoryId_PaginationInput {
    offset: Int!
    limit: Int! 
}



type Query {
    productCatalogByCategoryId(
        filters: ProductCatalogByCategoryId_FiltersInput!, 
        sort: Int,
        categoryId: Int!, 
        pagination: ProductCatalogByCategoryId_PaginationInput!
    ): ProductCatalogByCategoryId_Response!
}
`;

type GetProductCategoryParams = {
  filters: {
    tagFilters: { filterId: string; tags: string[] }[];
    priceFilter: { start: number; end: number };
  };
  sort?: number;
  categoryId: number;
  pagination: { offset: number; limit: number };
};

function Resolver(_: unknown, params: GetProductCategoryParams) {
  return graphqlErrorResponseHandler(getProductCatalogByCategoryId(params));
}
graphqlSchema.resolvers.Query.productCatalogByCategoryId = Resolver;
