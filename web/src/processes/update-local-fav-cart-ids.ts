import { useAppDispatch, useAppSelector } from 'app-root/store';
import { setLocalCartFavIdsState } from 'app-entities/local-cart-fav-ids';
import { useEffect, useRef } from 'react';

export function useUpdateLocalCartFavState() {
  const { cart, fav } = useAppSelector((state) => state.localCartFavIds);
  const dispatch = useAppDispatch();
  const initCompleted = useRef(false);

  useEffect(() => {
    const cartLocalStorage = localStorage.getItem('cart');
    const favLocalStorage = localStorage.getItem('favorites');
    const newState = {
      cart: cartLocalStorage ? JSON.parse(cartLocalStorage) : [],
      fav: favLocalStorage ? JSON.parse(favLocalStorage) : [],
    };
    dispatch(setLocalCartFavIdsState(newState));
  }, [dispatch]);

  useEffect(() => {
    if (initCompleted.current === false) return;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(fav));
  }, [cart, fav]);

  useEffect(() => {
    initCompleted.current = true;
  }, []);
}
