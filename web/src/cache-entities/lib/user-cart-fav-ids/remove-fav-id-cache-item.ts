import type { CacheEntities } from 'cache-entities';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';
import { QueryClient } from '@tanstack/react-query';

export function removeFavIdCacheItem(
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
      const newFavIds = prevValue.fav.filter(
        (el) =>
          el.productId !== item.productId ||
          el.productCharacteristicId !== item.productCharacteristicId
      );
      if (newFavIds.length === prevValue.fav.length) return prevValue;
      return { ...prevValue, fav: newFavIds };
    }
  );
}
