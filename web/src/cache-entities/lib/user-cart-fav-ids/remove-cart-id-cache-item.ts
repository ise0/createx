import type { CacheEntities } from 'cache-entities';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';
import { QueryClient } from '@tanstack/react-query';

export function removeCartIdCacheItem(
  queryClient: QueryClient,
  item: {
    productId: number;
    productCharacteristicId?: number;
  }
) {
  queryClient.setQueryData<CacheEntities['userCartFavIds']>(
    [CacheEntityKey.userCartFavIds],
    (prevValue) => {
      if (prevValue === undefined) return;
      const newCartIds = prevValue.cart.filter(
        (el) =>
          el.productId !== item.productId ||
          el.productCharacteristicId !== item.productCharacteristicId
      );
      if (newCartIds.length === prevValue.cart.length) return prevValue;
      return { ...prevValue, cart: newCartIds };
    }
  );
}
