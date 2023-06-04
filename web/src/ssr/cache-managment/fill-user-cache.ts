import { type QueryClient } from '@tanstack/react-query';
import { CacheEntities, CacheEntityKey } from 'cache-entities';
import { User } from 'ssr/model/user/types';

export function fillUserCache(
  queryClient: QueryClient,
  { userId, firstName, lastName, email }: User
) {
  queryClient.setQueryData<CacheEntities['user']>([CacheEntityKey.user], {
    userId,
    firstName,
    lastName,
    email,
  });

  return 'success';
}
