import { useAppSelector } from 'app-root/store';
import { useGetLocalFavoritesQuery } from 'features/use-get-local-favorites-query';
import { useGetUserFavoritesQuery } from 'features/use-get-user-favorites-query';
import { Modal } from 'shared/ui/modal';
import Spin from 'shared/ui/spin';
import { Product } from './blocks/product';
import styles from './styles/favorites-modal.module.scss';

export function FavModal({ closeModal }: { closeModal: () => void }) {
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);
  const userFavQuery = useGetUserFavoritesQuery({
    enabled: isAuthenticated,
    keepPreviousData: true,
  });
  const favProductsQuery = useGetLocalFavoritesQuery({
    enabled: !isAuthenticated,
    keepPreviousData: true,
  });

  const query = isAuthenticated ? userFavQuery : favProductsQuery;

  return (
    <Modal alignX="right" alignY="top" autoClose={closeModal}>
      <div className={styles['favorites-modal']}>
        {query.isFetching && (
          <div className={styles['favorites-modal__loading']}>
            <Spin className={styles['favorites-modal__loading-spin']} />
          </div>
        )}
        <div className={styles['favorites-modal__container-1']}>
          <h2 className={styles['favorites-modal__title']}>
            Your favorites ({query.data?.length})
          </h2>
          <button
            className={styles['favorites-modal__close']}
            aria-label="close"
            onClick={closeModal}
          />
        </div>
        <ul className={styles['favorites-modal__products']}>
          {query.data?.map((el) => (
            <li
              className={styles['favorites-modal__item']}
              key={`${el.productId} ${el.productCharacteristicId}`}
            >
              <Product product={el} />
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
