import type { CacheEntities } from 'cache-entities';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';
import { QueryClient } from '@tanstack/react-query';

export function setCartIdsCache(
  queryClient: QueryClient,
  cartIds: {
    productId: number;
    productCharacteristicId?: number;
  }[]
) {
  queryClient.setQueryData<CacheEntities['userCartFavIds']>(
    [CacheEntityKey.userCartFavIds],
    (prevValue = { cart: [], fav: [] }) => {
      return { ...prevValue, cart: cartIds };
    }
  );
}
