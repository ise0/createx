import { QueryClient } from '@tanstack/react-query';
import { updateLocalCartCacheItemQuantity } from 'cache-entities/lib/local-cart';

export function onAddLocalCartItem(
  queryClient: QueryClient,
  item: { productId: number; productCharacteristicId?: number; quantity: number }
) {
  updateLocalCartCacheItemQuantity(queryClient, { ...item });
}
