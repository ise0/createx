import { useAppSelector } from 'app-root/store';
import { useGetUserCartQuery } from 'features/use-get-user-cart-query';
import { useGetLocalCartQuery } from 'features/use-get-local-cart-query';
import { Btn } from 'shared/ui/btn';
import { Modal } from 'shared/ui/modal';
import Spin from 'shared/ui/spin';
import { Product } from './blocks/product';
import styles from './styles/cart-modal.module.scss';

export function CartModal({ closeModal }: { closeModal: () => void }) {
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);
  const userCartQuery = useGetUserCartQuery({ keepPreviousData: true });
  const cartProductsQuery = useGetLocalCartQuery({
    enabled: !isAuthenticated,
    keepPreviousData: true,
  });

  const query = isAuthenticated ? userCartQuery : cartProductsQuery;

  return (
    <Modal alignX="right" alignY="top" autoClose={closeModal}>
      <div className={styles['cart-modal']}>
        {query.isFetching && (
          <div className={styles['cart-modal__loading']}>
            <Spin className={styles['cart-modal__loading-spin']} />
          </div>
        )}
        {query.data && (
          <>
            <div className={styles['cart-modal__container-1']}>
              <h2 className={styles['cart-modal__title']}>{`Your cart (${query.data?.length})`}</h2>
              <button
                className={styles['cart-modal__close']}
                aria-label="close"
                onClick={closeModal}
              />
            </div>
            <ul className={styles['cart-modal__products']}>
              {query.data?.map((el) => (
                <li
                  className={styles['cart-modal__item']}
                  key={`${el.productId} ${el.productCharacteristicId}`}
                >
                  <Product product={el} />
                </li>
              ))}
            </ul>
            <div className={styles['cart-modal__container-2']}>
              <div className={styles['cart-modal__subtotal']}>
                Subtotal:{' '}
                <span className={styles['cart-modal__subtotal-amount']}>
                  {query.data.reduce((accum, { price, quantity, priceWithDiscount }) => {
                    return (
                      accum + (priceWithDiscount ? priceWithDiscount * quantity : price * quantity)
                    );
                  }, 0)}
                </span>
              </div>
              <Btn
                className={styles['cart-modal__checkout']}
                text="Checkout"
                type="button"
                size="l"
                theme="solid"
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
