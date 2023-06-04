import { QueryClient } from '@tanstack/react-query';
import { removeCartIdCacheItem } from 'cache-entities/lib/user-cart-fav-ids';
import { removeUserCartCacheItem } from 'cache-entities/lib/user-cart';

export function onRemoveUserCartItem(
  queryClient: QueryClient,
  item: { productId: number; productCharacteristicId?: number }
) {
  removeUserCartCacheItem(queryClient, item);
  removeCartIdCacheItem(queryClient, item);
}
