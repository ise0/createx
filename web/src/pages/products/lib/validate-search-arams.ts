import { ProductCatalog } from 'ssr/model/product/types';
import { SearchParams } from '../types';

export function validateSearchParams(
  productCatalog: ProductCatalog,
  searchParams: SearchParams
): SearchParams {
  const prevPriceFilterValue = searchParams.filters.priceFilter;
  const newPriceFilterValue =
    prevPriceFilterValue === undefined
      ? undefined
      : {
          start:
            prevPriceFilterValue.start < productCatalog.filters.priceFilter.min
              ? productCatalog.filters.priceFilter.min
              : prevPriceFilterValue.start,
          end:
            prevPriceFilterValue.end > productCatalog.filters.priceFilter.max
              ? productCatalog.filters.priceFilter.max
              : prevPriceFilterValue.end,
        };

  return {
    ...searchParams,
    filters: { ...searchParams.filters, priceFilter: newPriceFilterValue },
  };
}
