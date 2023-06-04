import { QueryClient } from '@tanstack/react-query';
import { getUserCartFavIds } from 'ssr/model/get-user-cart-fav-ids';
import { CacheEntities, CacheEntityKey } from 'cache-entities';

export async function fillCartFavIdsCache(queryClient: QueryClient, userId: number) {
  const userCartFavIds = await getUserCartFavIds(userId);

  if (userCartFavIds.error) return 'fail';

  queryClient.setQueryData<CacheEntities['userCartFavIds']>(
    [CacheEntityKey.userCartFavIds],
    userCartFavIds.data
  );

  return 'success';
}
