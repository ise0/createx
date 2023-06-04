import { getUserCartFavIds } from './api/get-user-cart-fav-ids';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { CacheEntityKey, CacheEntities } from 'cache-entities';
import { useAppSelector } from 'app-root/store';

type Errors = Extract<Awaited<ReturnType<typeof getUserCartFavIds>>, { data?: undefined }>['error'];

export function useGetUserCartFavIdsQuery(
  options: Omit<
    UseQueryOptions<
      CacheEntities['userCartFavIds'],
      Errors,
      CacheEntities['userCartFavIds'],
      [string]
    >,
    'queryFn' | 'useErrorBoundary' | 'queryKey'
  >
) {
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);

  return useQuery([CacheEntityKey.userCartFavIds], {
    ...options,
    enabled: options.enabled !== undefined ? options.enabled && isAuthenticated : isAuthenticated,
    queryFn: async () => {
      const res = await getUserCartFavIds();
      if (res.error !== undefined) throw res.error;
      return res.data;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
