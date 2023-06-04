import { useAppDispatch } from 'app-root/store';
import { signUp } from '../api/sign-up';
import { setIsAuthenticated } from 'app-entities/user/model';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { graphqlApi } from 'shared/api';
import { CacheEntities, CacheEntityKey } from 'cache-entities';

type ErrorRes = Extract<Awaited<ReturnType<typeof signUp>>, { data?: undefined }>['error'];

type Params = Parameters<typeof signUp>[0];

export function useSignUpMutation(
  options: Omit<UseMutationOptions<'success', ErrorRes, Params>, 'mutationFn' | 'useErrorBoundary'>
) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async (params: Params) => {
      const res = await signUp(params);
      if (res.error !== undefined) throw res.error;

      queryClient.setQueryData<CacheEntities['user']>([CacheEntityKey.user], res.data.user);

      dispatch(setIsAuthenticated(true));
      graphqlApi.defaults.headers.common['Authorization'] = res.data.token;

      return 'success' as const;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
