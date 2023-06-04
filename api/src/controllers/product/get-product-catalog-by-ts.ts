import { getProductCatalogByTS as modelGetProductCatalog } from '@src/models/product';

type Params = {
  filters: {
    tagFilters: { filterId: string; tags: string[] }[];
    priceFilter: { start: number; end: number };
  };
  sort?: number;
  textSearch: string;
  pagination: { offset: number; limit: number };
};

export function getProductCatalogByTS(params: Params) {
  return modelGetProductCatalog(params);
}
