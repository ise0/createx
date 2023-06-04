import { logout } from '../api/logout';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { graphqlApi } from 'shared/api';

type ErrorRes = Extract<Awaited<ReturnType<typeof logout>>, { data?: undefined }>['error'];

export function useLogoutMutation(
  options: Omit<UseMutationOptions<'success', ErrorRes>, 'mutationFn' | 'useErrorBoundary'>
) {
  return useMutation({
    ...options,
    mutationFn: async () => {
      delete graphqlApi.defaults.headers.common['Authorization'];
      document.cookie = `auth_jwt=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

      window.location.reload();

      return 'success' as const;
    },
    useErrorBoundary: (err) => err instanceof Error,
  });
}
