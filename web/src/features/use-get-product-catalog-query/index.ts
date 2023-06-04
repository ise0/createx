import { getProductCatalogByCategoryId } from './api/get-product-catalog-by-category-id';
import { getProductCatalogByTS } from './api/get-product-catalog-by-ts';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { CacheEntityKey } from 'cache-entities';

type Response = Awaited<ReturnType<typeof getProductCatalogByCategoryId>>;
type DataRes = Extract<Response, { error?: undefined }>['data'];
type ErrorRes = Extract<Response, { data?: undefined }>['error'];

type Params = {
  filters: {
    tagFilters: {
      filterId: string;
      tags: string[];
    }[];
    priceFilter?: { start: number; end: number };
  };
  sort: number;
  pagination: { limit: number; offset: number };
  searchBy: { type: 'categoryId'; value: number } | { type: 'textSearch'; value: string };
};

export function useGetProductCatalogQuery(
  options: Omit<
    UseQueryOptions<DataRes, ErrorRes, DataRes, [string, unknown]>,
    'queryFn' | 'useErrorBoundary' | 'queryKey'
  > & { onQueryFn?: () => void },
  { searchBy, ...searchParams }: Params
) {
  const queryKey = JSON.parse(JSON.stringify({ ...searchParams, searchBy }));
  
  return useQuery([CacheEntityKey.productCatalog, queryKey], {
    ...options,
    queryFn: async () => {
      if (options.onQueryFn) options.onQueryFn();

      if (searchBy.type === 'categoryId') {
        const res = await getProductCatalogByCategoryId({
          ...searchParams,
          categoryId: searchBy.value,
        });
        if (res.error !== undefined) throw res.error;
        return res.data;
      }
      const res = await getProductCatalogByTS({
        ...searchParams,
        textSearch: searchBy.value,
      });
      if (res.error !== undefined) throw res.error;
      return res.data;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
