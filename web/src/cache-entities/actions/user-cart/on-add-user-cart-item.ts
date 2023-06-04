import { QueryClient } from '@tanstack/react-query';
import type { CacheEntities } from 'cache-entities';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';
import { addCartIdCacheItem } from 'cache-entities/lib/user-cart-fav-ids';
import { updateUserCartCacheItemQuantity } from 'cache-entities/lib/user-cart';

export function onAddUserCartItem(
  queryClient: QueryClient,
  item: { productId: number; productCharacteristicId?: number; quantity: number }
) {
  addCartIdCacheItem(queryClient, item);
  const cartFavIds = queryClient.getQueryData<CacheEntities['userCartFavIds']>([
    CacheEntityKey.userCartFavIds,
  ]);
  if (cartFavIds === undefined) {
    queryClient.invalidateQueries([CacheEntityKey.userCart]);
  } else if (
    cartFavIds.cart.find(
      (el) =>
        el.productId === item.productId &&
        el.productCharacteristicId === item.productCharacteristicId
    ) !== undefined
  ) {
    updateUserCartCacheItemQuantity(queryClient, { ...item });
  } else {
    queryClient.invalidateQueries([CacheEntityKey.userCart]);
  }
}
