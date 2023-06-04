import { QueryClient } from '@tanstack/react-query';
import { addFavIdCacheItem } from 'cache-entities/lib/user-cart-fav-ids';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';

export function onAddUserFavoritesItem(
  queryClient: QueryClient,
  item: {
    productId: number;
    productCharacteristicId?: number;
  }
) {
  queryClient.invalidateQueries([CacheEntityKey.userFavorites]);
  addFavIdCacheItem(queryClient, item);
}
