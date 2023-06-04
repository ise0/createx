export const queryText = `
query ProductCatalogByTS($filters: ProductCatalogByTS_FiltersInput!, $textSearch: String!, $pagination: ProductCatalogByTS_PaginationInput!, $sort: Int) {
  productCatalogByTS(filters: $filters, textSearch: $textSearch, pagination: $pagination, sort: $sort) {
    elements_number
    elements {
      product_id
      requested_variant_id
      product_name
      rating
      description
      prices {
        characteristic_id
        price
        price_with_discount
        discount
      }
      product_attributes {
        attribute_type_id
        attribute_name
        attribute_value
        attribute_view
      }
      product_characteristics {
        characteristic_id
        product_variant_id
        characteristic_values {
          characteristic_type_id
          characteristic_name
          characteristic_value
          characteristic_view
        }
      }
      product_variants {
        product_variant_id
        sku
        image_preview
        images
      }
    }
    filters {
      tag_filters {
        filter_id
        filter_name
        tags {
          tag
          tag_view
          elements_number
        }
      }
      price_filter {
        min
        max
      }
    }
    sort {
      id
      name
    }
  }
}
`;
