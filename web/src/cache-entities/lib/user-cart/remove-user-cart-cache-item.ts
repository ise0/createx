import type { CacheEntities } from 'cache-entities';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';
import { QueryClient } from '@tanstack/react-query';

export function removeUserCartCacheItem(
  queryClient: QueryClient,
  item: {
    productId: number;
    productCharacteristicId?: number;
  }
) {
  queryClient.setQueryData<CacheEntities['userCart']>([CacheEntityKey.userCart], (prevValue) => {
    if (prevValue === undefined) return;
    const newCart = prevValue.filter(
      (el) =>
        el.productId !== item.productId ||
        el.productCharacteristicId !== item.productCharacteristicId
    );
    if (newCart.length === prevValue.length) return prevValue;
    return newCart;
  });
}
