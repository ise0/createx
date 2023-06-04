import { useAppSelector } from 'app-root/store';
import { getCartProducts } from './api/get-cart-products';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { CacheEntities, CacheEntityKey } from 'cache-entities';

type Errors = Extract<Awaited<ReturnType<typeof getCartProducts>>, { data?: undefined }>['error'];

export function useGetLocalCartQuery(
  options: Omit<
    UseQueryOptions<
      CacheEntities['userCart'],
      Errors,
      CacheEntities['userCart'],
      [string, { productId: number; productCharacteristicId?: number }[]]
    >,
    'queryFn' | 'useErrorBoundary' | 'queryKey'
  >
) {
  const localCart = useAppSelector((state) => state.localCartFavIds.cart);

  return useQuery(
    [
      CacheEntityKey.localCart,
      localCart.map(({ productId, productCharacteristicId }) => ({
        productId,
        productCharacteristicId,
      })),
    ],
    {
      ...options,
      queryFn: async () => {
        if (localCart.length === 0) return [];
        const res = await getCartProducts(localCart);
        if (res.error !== undefined) throw res.error;
        return res.data;
      },
      useErrorBoundary: (err) => err instanceof Error,
    }
  );
}
