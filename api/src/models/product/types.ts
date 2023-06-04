export type Product = {
  requested_variant_id: number;
  product_id: number;
  product_name: string;
  rating: number;
  description: string;
  prices: {
    characteristic_id: number;
    price: number;
    price_with_discount: number;
    discount: number;
  }[];
  product_attributes: {
    attribute_type_id: number;
    attribute_name: string;
    attribute_value: Record<string, unknown>;
    attribute_view: Record<string, unknown>;
  }[];
  product_characteristics: {
    characteristic_id: number;
    product_varinat_id: number;
    characteristic_values: {
      characteristic_type_id: number;
      characteristic_name: string;
      characteristic_value: Record<string, unknown>;
      characteristic_view: Record<string, unknown>;
    }[];
  }[];
  product_variants: {
    product_varinat_id: number;
    sku: string;
    image_preview: string;
    images: string[];
  }[];
};

export type ProductCatalog = {
  elements_number: number;
  elements: Product[];
  filters: {
    tag_filters: {
      filter_id: string;
      filter_name: string;
      tags: { tag: string; tag_view: unknown; elements_number: number };
    }[];
    price_filter: { filter_id: string; filter_name: string; min: number; max: number };
  };
  sort: { id: number; name: string }[];
};
