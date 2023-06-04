import { QueryClient } from '@tanstack/react-query';
import type { CacheEntities } from 'cache-entities';
import { setCartIdsCache } from 'cache-entities/lib/user-cart-fav-ids';

export function onUserCartSet(queryClient: QueryClient, data: CacheEntities['userCart']) {
  setCartIdsCache(
    queryClient,
    data.map(({ productId, productCharacteristicId }) => ({
      productId,
      productCharacteristicId,
    }))
  );
}
