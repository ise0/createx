import { getProductCatalogByCategoryId as modelGetProductCatalog } from '@src/models/product';

type Params = {
  filters: {
    tagFilters: { filterId: string; tags: string[] }[];
    priceFilter: { start: number; end: number };
  };
  sort?: number;
  categoryId: number;
  pagination: { offset: number; limit: number };
};

export function getProductCatalogByCategoryId(params: Params) {
  return modelGetProductCatalog(params);
}
