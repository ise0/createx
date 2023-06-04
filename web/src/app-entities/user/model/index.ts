import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ReduxRootState } from 'app-root/store';
import { HYDRATE } from 'next-redux-wrapper';
// import type{ ReduxHydrateAction } from 'ssr/types';

type InitialState = {
  isAuthenticated: boolean;
};

const initialState: InitialState = { isAuthenticated: false };

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setIsAuthenticated(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(HYDRATE, (state, action: { type: typeof HYDRATE; payload: ReduxRootState }) => {
      state.isAuthenticated = action.payload.userAuth.isAuthenticated;
    });
  },
});

export const { setIsAuthenticated } = userAuthSlice.actions;
