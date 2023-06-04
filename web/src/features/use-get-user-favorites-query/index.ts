import { useAppSelector } from 'app-root/store';
import { getUserFavorites } from './api/get-user-favorites';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { CacheEntityKey, CacheEntities, onUserFavoritesSet } from 'cache-entities';

type Errors = Extract<Awaited<ReturnType<typeof getUserFavorites>>, { data?: undefined }>['error'];

export function useGetUserFavoritesQuery(
  options: Omit<
    UseQueryOptions<
      CacheEntities['userFavorites'],
      Errors,
      CacheEntities['userFavorites'],
      [string]
    >,
    'queryFn' | 'useErrorBoundary' | 'queryKey'
  >
) {
  const queryClient = useQueryClient();
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);
  return useQuery([CacheEntityKey.userFavorites], {
    ...options,
    enabled: options.enabled !== undefined ? options.enabled && isAuthenticated : isAuthenticated,
    queryFn: async () => {
      const res = await getUserFavorites();
      if (res.error !== undefined) throw res.error;

      onUserFavoritesSet(queryClient, res.data);

      return res.data;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
