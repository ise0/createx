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
