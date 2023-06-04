import { useAppDispatch } from 'app-root/store';
import { signIn } from '../api/sign-in';
import { setIsAuthenticated } from 'app-entities/user/model';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { graphqlApi } from 'shared/api';
import { CacheEntities, CacheEntityKey } from 'cache-entities';

type ErrorRes = Extract<Awaited<ReturnType<typeof signIn>>, { data?: undefined }>['error'];

type Params = Parameters<typeof signIn>[0];

export function useSignInMutation(
  options: Omit<UseMutationOptions<'success', ErrorRes, Params>, 'mutationFn' | 'useErrorBoundary'>
) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async (params: Params) => {
      const res = await signIn(params);
      if (res.error !== undefined) throw res.error;

      queryClient.setQueryData<CacheEntities['user']>([CacheEntityKey.user], res.data.user);

      graphqlApi.defaults.headers.common['Authorization'] = res.data.token;
      dispatch(setIsAuthenticated(true));

      return 'success' as const;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
