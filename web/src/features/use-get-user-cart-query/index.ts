import { getUserCart } from './api/get-user-cart';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { CacheEntityKey, CacheEntities, onUserCartSet } from 'cache-entities';
import { useAppSelector } from 'app-root/store';

type Errors = Extract<Awaited<ReturnType<typeof getUserCart>>, { data?: undefined }>['error'];

export function useGetUserCartQuery(
  options: Omit<
    UseQueryOptions<CacheEntities['userCart'], Errors, CacheEntities['userCart'], [string]>,
    'queryFn' | 'useErrorBoundary' | 'queryKey'
  >
) {
  const queryClient = useQueryClient();
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);

  return useQuery([CacheEntityKey.userCart], {
    ...options,
    enabled: options.enabled !== undefined ? options.enabled && isAuthenticated : isAuthenticated,
    queryFn: async () => {
      const res = await getUserCart();
      if (res.error !== undefined) throw res.error;

      onUserCartSet(queryClient, res.data);

      return res.data;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
