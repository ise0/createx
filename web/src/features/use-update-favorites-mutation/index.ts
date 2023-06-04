import { useAppDispatch, useAppSelector } from 'app-root/store';
import {
  addLocalFavItem,
  removeLocalFavItem,
  addLocalCartItem,
} from 'app-entities/local-cart-fav-ids';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { addFavItem, removeFavItem, moveToCart } from './api';
import {
  onAddUserCartItem,
  onAddUserFavoritesItem,
  onRemoveUserFavoritesItem,
} from 'cache-entities';

type Action =
  | {
      type: 'addItem';
      item: {
        productId: number;
        productCharacteristicId?: number;
      };
    }
  | {
      type: 'removeItem';
      item: {
        productId: number;
        productCharacteristicId?: number;
      };
    }
  | {
      type: 'moveToCart';
      item: {
        productId: number;
        productCharacteristicId?: number;
      };
    };

type Errors = Extract<
  Awaited<ReturnType<typeof addFavItem | typeof removeFavItem | typeof moveToCart>>,
  { data?: undefined }
>['error'];

export function useUpdateFavoritesMutation(
  options: Omit<UseMutationOptions<'success', Errors, Action>, 'mutationFn' | 'useErrorBoundary'>
) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async ({ item, type }: Action) => {
      if (isAuthenticated === false) {
        if (type === 'addItem') {
          dispatch(addLocalFavItem(item));
        }
        if (type === 'removeItem') {
          dispatch(removeLocalFavItem(item));
        }
        if (type === 'moveToCart') {
          dispatch(removeLocalFavItem(item));
          dispatch(addLocalCartItem({ ...item, quantity: 1 }));
        }
        return 'success' as const;
      }

      if (type === 'addItem') {
        const res = await addFavItem(item);
        if (res.error !== undefined) throw res.error;
        onAddUserFavoritesItem(queryClient, item);
      }
      if (type === 'removeItem') {
        const res = await removeFavItem(item);
        if (res.error !== undefined) throw res.error;
        onRemoveUserFavoritesItem(queryClient, item);
      }
      if (type === 'moveToCart') {
        const res = await moveToCart(item);
        if (res.error !== undefined) throw res.error;
        onRemoveUserFavoritesItem(queryClient, item);
        onAddUserCartItem(queryClient, { ...item, quantity: 1 });
      }
      return 'success' as const;
    },
  });
}
