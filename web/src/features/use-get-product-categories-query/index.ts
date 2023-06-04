import { getProductCategories } from './api/get-product-categories';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { CacheEntities, CacheEntityKey } from 'cache-entities';

type ErrorRes = Extract<
  Awaited<ReturnType<typeof getProductCategories>>,
  { data?: undefined }
>['error'];

export function useGetProductCategoriesQuery(
  options: Omit<
    UseQueryOptions<
      CacheEntities['productCategories'],
      ErrorRes,
      CacheEntities['productCategories'],
      [string]
    >,
    'queryFn' | 'useErrorBoundary' | 'queryKey'
  >
) {
  return useQuery([CacheEntityKey.productCategories], {
    ...options,
    queryFn: async () => {
      const res = await getProductCategories();
      if (res.error !== undefined) throw res.error;
      return res.data;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
