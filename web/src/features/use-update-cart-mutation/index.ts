import { useAppDispatch, useAppSelector } from 'app-root/store';
import {
  addLocalFavItem,
  addLocalCartItem,
  removeLocalCartItem,
} from 'app-entities/local-cart-fav-ids';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { addCartItem, moveToFav, removeCartItem } from './api';
import {
  onAddLocalCartItem,
  onAddUserCartItem,
  onAddUserFavoritesItem,
  onRemoveUserCartItem,
} from 'cache-entities';

type Action =
  | {
      type: 'addItem';
      item: {
        productId: number;
        productCharacteristicId?: number;
        quantity: number;
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
      type: 'moveToFav';
      item: {
        productId: number;
        productCharacteristicId?: number;
      };
    };

type Errors = Extract<
  Awaited<ReturnType<typeof addCartItem | typeof removeCartItem | typeof moveToFav>>,
  { data?: undefined }
>['error'];

export function useUpdateCartMutation(
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
          dispatch(addLocalCartItem(item));
          onAddLocalCartItem(queryClient, item);
        }
        if (type === 'removeItem') {
          dispatch(removeLocalCartItem(item));
        }
        if (type === 'moveToFav') {
          dispatch(removeLocalCartItem(item));
          dispatch(addLocalFavItem(item));
        }
        return 'success' as const;
      }
      if (type === 'addItem') {
        const res = await addCartItem(item);
        if (res.error !== undefined) throw res.error;
        onAddUserCartItem(queryClient, item);
      }
      if (type === 'removeItem') {
        const res = await removeCartItem(item);
        if (res.error !== undefined) throw res.error;
        onRemoveUserCartItem(queryClient, item);
      }
      if (type === 'moveToFav') {
        const res = await moveToFav(item);
        if (res.error !== undefined) throw res.error;
        onRemoveUserCartItem(queryClient, item);
        onAddUserFavoritesItem(queryClient, item);
      }
      return 'success' as const;
    },
  });
}
