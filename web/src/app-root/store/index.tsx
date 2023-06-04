import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { localCartFavIdsSlice } from 'app-entities/local-cart-fav-ids';
import { userAuthSlice } from 'app-entities/user/model';

const createStore = () => {
  return configureStore({
    reducer: {
      userAuth: userAuthSlice.reducer,
      localCartFavIds: localCartFavIdsSlice.reducer,
    },
  });
};

type ReduxStore = ReturnType<typeof createStore>;
export type ReduxRootState = ReturnType<ReduxStore['getState']>;
export type AppDispatch = ReduxStore['dispatch'];

export const storeWrapper = createWrapper(createStore);
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReduxRootState> = useSelector;
