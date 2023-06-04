import { useUpdateLocalCartFavState } from 'processes/update-local-fav-cart-ids';
import { PropsWithChildren } from 'react';

export function Processes({ children }: PropsWithChildren) {
  useUpdateLocalCartFavState();
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
