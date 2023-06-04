import { useAppSelector } from 'app-root/store';
import { getUser } from './api/get-user';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { CacheEntityKey, CacheEntities } from 'cache-entities';

type ErrorRes = Extract<Awaited<ReturnType<typeof getUser>>, { data?: undefined }>['error'];

export function useGetUserQuery(
  options: Omit<
    UseQueryOptions<CacheEntities['user'], ErrorRes, CacheEntities['user'], [string]>,
    'queryFn' | 'useErrorBoundary' | 'queryKey'
  >
) {
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);
  return useQuery([CacheEntityKey.user], {
    ...options,
    enabled: options.enabled !== undefined ? options.enabled && isAuthenticated : isAuthenticated,
    staleTime: Infinity,
    cacheTime: Infinity,
    queryFn: async () => {
      const res = await getUser();
      if (res.error !== undefined) throw res.error;
      return res.data;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
