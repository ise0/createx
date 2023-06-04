import { useAppSelector } from 'app-root/store';
import { getFavProducts } from './api/get-fav-products';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { CacheEntityKey, CacheEntities } from 'cache-entities';

type Errors = Extract<Awaited<ReturnType<typeof getFavProducts>>, { data?: undefined }>['error'];

export function useGetLocalFavoritesQuery(
  options: Omit<
    UseQueryOptions<
      CacheEntities['localFavorites'],
      Errors,
      CacheEntities['localFavorites'],
      [string, { productId: number; productCharacteristicId?: number }[]]
    >,
    'queryFn' | 'useErrorBoundary' | 'queryKey'
  >
) {
  const localFavorites = useAppSelector((state) => state.localCartFavIds.fav);
  return useQuery([CacheEntityKey.localFavorites, localFavorites], {
    ...options,
    queryFn: async () => {
      if (localFavorites.length === 0) return [];
      const res = await getFavProducts(localFavorites);
      if (res.error !== undefined) throw res.error;
      return res.data;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
