import type { CacheEntities } from 'cache-entities';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';
import { QueryClient } from '@tanstack/react-query';

export function removeUserFavoritesCacheItem(
  queryClient: QueryClient,
  item: {
    productId: number;
    productCharacteristicId?: number;
  }
) {
  queryClient.setQueryData<CacheEntities['userFavorites']>(
    [CacheEntityKey.userFavorites],
    (prevValue) => {
      if (prevValue === undefined) return;
      const newFavorties = prevValue.filter(
        (el) =>
          el.productId !== item.productId ||
          el.productCharacteristicId !== item.productCharacteristicId
      );
      if (newFavorties.length === prevValue.length) return prevValue;
      return newFavorties;
    }
  );
}
