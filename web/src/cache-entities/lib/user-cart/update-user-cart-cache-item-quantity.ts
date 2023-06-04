import type { CacheEntities } from 'cache-entities';
import { CacheEntityKey } from 'cache-entities/cache-entity-key';
import { QueryClient } from '@tanstack/react-query';

export function updateUserCartCacheItemQuantity(
  queryClient: QueryClient,
  item: {
    productId: number;
    productCharacteristicId?: number;
    quantity: number;
  }
) {
  queryClient.setQueryData<CacheEntities['userCart']>([CacheEntityKey.userCart], (prevValue) => {
    if (prevValue === undefined) return;
    const itemIndex = prevValue.findIndex(
      (el) =>
        el.productId === item.productId &&
        el.productCharacteristicId === item.productCharacteristicId
    );

    if (itemIndex === -1) return prevValue;

    const newCart = [...prevValue];
    newCart.splice(itemIndex, 1, { ...prevValue[itemIndex], quantity: item.quantity });
    return newCart;
  });
}
