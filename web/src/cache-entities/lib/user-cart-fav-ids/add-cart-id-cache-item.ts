import type { CacheEntities } from 'cache-entities';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';
import { QueryClient } from '@tanstack/react-query';

export function addCartIdCacheItem(
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
      if (
        prevValue.cart.find(
          (el) =>
            el.productId === item.productId &&
            el.productCharacteristicId === item.productCharacteristicId
        ) !== undefined
      ) {
        return prevValue;
      }

      return { ...prevValue, cart: [...prevValue.cart, item] };
    }
  );
}
