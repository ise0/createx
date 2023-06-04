import { ApiErrorCode, GraphqlError } from 'shared/api';

type ResponseProduct = {
  requested_variant_id: number;
  product_id: number;
  product_name: string;
  rating: number;
  description: string;
  prices: {
    characteristic_id: number;
    price: number;
    price_with_discount?: number;
    discount?: number;
  }[];
  product_attributes: {
    attribute_type_id: number;
    attribute_name: string;
    attribute_value: unknown;
    attribute_view: unknown;
  }[];
  product_characteristics: {
    characteristic_id: number;
    product_variant_id: number;
    characteristic_values: {
      characteristic_type_id: number;
      characteristic_name: string;
      characteristic_value: unknown;
      characteristic_view: unknown;
    }[];
  }[];
  product_variants: {
    product_variant_id: number;
    sku: string;
    image_preview: string;
    images: string[];
  }[];
};

type ResponseProductCatalog = {
  elements_number: number;
  elements: ResponseProduct[];
  filters: {
    tag_filters: {
      filter_id: string;
      filter_name: string;
      tag: string;
      tag_view: unknown;
      elements_number: number;
    }[];
    price_filter?: { filter_id: string; filter_name: string; min: number; max: number };
  };
};

export type ServerResponse =
  | {
      data: { productCatalogByTS: ResponseProductCatalog };
      errors: undefined;
    }
  | {
      data: undefined;
      errors: [GraphqlError<ApiErrorCode.internalServerError, undefined>];
    };

type Product = {
  requestedVariantId: number;
  productId: number;
  productName: string;
  rating: number;
  description: string;
  prices: {
    characteristicId: number;
    price: number;
    priceWithDiscount?: number;
    discount?: number;
  }[];
  productAttributes: {
    attributeTypeId: number;
    attributeName: string;
    attributeValue: unknown;
    attributeView: unknown;
  }[];
  productCharacteristics: {
    characteristicId: number;
    productVariantId: number;
    characteristicValues: {
      characteristicTypeId: number;
      characteristicName: string;
      characteristicValue: unknown;
      characteristicView: unknown;
    }[];
  }[];
  productVariants: {
    productVariantId: number;
    sku: string;
    imagePreview: string;
    images: string[];
  }[];
};

export type ProductCatalog = {
  elementsNumber: number;
  elements: Product[];
  filters: {
    tagFilters: {
      filterId: string;
      filterName: string;
      tags: { tag: string; tagView: unknown; elementsNumber: number }[];
    }[];
    priceFilter: { min: number; max: number };
  };
  sort: { id: number; name: string }[];
};
