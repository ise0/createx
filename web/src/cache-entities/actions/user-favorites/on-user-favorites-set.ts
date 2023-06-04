import { QueryClient } from '@tanstack/react-query';
import type { CacheEntities } from 'cache-entities';
import { setFavIdsCache } from 'cache-entities/lib/user-cart-fav-ids';

export function onUserFavoritesSet(
  queryClient: QueryClient,
  data: CacheEntities['userFavorites']
) {
  setFavIdsCache(
    queryClient,
    data.map(({ productId, productCharacteristicId }) => ({
      productId,
      productCharacteristicId,
    }))
  );
}
