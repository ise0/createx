import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ItemId = { productId: number; productCharacteristicId?: number };
type CartItem = ItemId & { quantity: number };

type InitialState = {
  cart: CartItem[];
  fav: ItemId[];
};

const initialState: InitialState = { cart: [], fav: [] };

export const localCartFavIdsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLocalCartFavIdsState(state, { payload }: PayloadAction<InitialState>) {
      return payload;
    },
    addLocalFavItem({ fav }, { payload }: PayloadAction<ItemId>) {
      const prevItem = fav.find(
        (el) =>
          el.productId === payload.productId &&
          el.productCharacteristicId === payload.productCharacteristicId
      );
      if (prevItem === undefined) fav.push(payload);
    },
    removeLocalFavItem({ fav }, { payload }: PayloadAction<ItemId>) {
      const index = fav.findIndex(
        (el) =>
          el.productId === payload.productId &&
          el.productCharacteristicId === payload.productCharacteristicId
      );
      if (index !== -1) fav.splice(index, 1);
    },
    addLocalCartItem({ cart }, { payload }: PayloadAction<CartItem>) {
      const prevItem = cart.find(
        (el) =>
          el.productId === payload.productId &&
          el.productCharacteristicId === payload.productCharacteristicId
      );
      if (prevItem === undefined) {
        cart.push(payload);
        return;
      }
      prevItem.quantity = payload.quantity;
    },
    removeLocalCartItem({ cart }, { payload }: PayloadAction<ItemId>) {
      const index = cart.findIndex(
        (el) =>
          el.productId === payload.productId &&
          el.productCharacteristicId === payload.productCharacteristicId
      );
      if (index !== -1) cart.splice(index, 1);
    },
  },
});

export const {
  addLocalCartItem,
  removeLocalCartItem,
  addLocalFavItem,
  removeLocalFavItem,
  setLocalCartFavIdsState,
} = localCartFavIdsSlice.actions;
