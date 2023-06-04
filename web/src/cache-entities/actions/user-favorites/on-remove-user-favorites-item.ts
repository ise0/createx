import { QueryClient } from '@tanstack/react-query';
import { removeFavIdCacheItem } from 'cache-entities/lib/user-cart-fav-ids';
import { removeUserFavoritesCacheItem } from 'cache-entities/lib/user-favorites';

export function onRemoveUserFavoritesItem(
  queryClient: QueryClient,
  item: {
    productId: number;
    productCharacteristicId?: number;
  }
) {
  removeUserFavoritesCacheItem(queryClient, item);
  removeFavIdCacheItem(queryClient, item);
}
