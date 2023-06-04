import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { Input } from 'shared/ui/input';
import styles from './styles/page-nav.module.scss';
import { Menu } from './s-menu';
import { useState } from 'react';
import { useAppSelector } from 'app-root/store';
import { useGetProductCategoriesQuery } from 'features/use-get-product-categories-query';
import { useGetUserCartFavIdsQuery } from 'features/use-get-user-cart-fav-ids-query';

type Props = {
  className?: string;
  onCategoryChange: (id: number) => void;
  onSearchTextConfirm: (text: string) => void;
  onCartClick: () => void;
  onFavClick: () => void;
};

export default function PageNav({
  className,
  onCategoryChange,
  onSearchTextConfirm,
  onCartClick,
  onFavClick,
}: Props) {
  const { data: userCartFavIds } = useGetUserCartFavIdsQuery({});
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);
  const localCartFavIds = useAppSelector((state) => state.localCartFavIds);

  const [searchText, setSearchText] = useState('');
  const categoriesQuery = useGetProductCategoriesQuery({ staleTime: Infinity });

  let numCartItems: number;
  let numFavItems: number;

  if (isAuthenticated) {
    numCartItems = userCartFavIds ? userCartFavIds.cart.length : 0;
    numFavItems = userCartFavIds ? userCartFavIds.fav.length : 0;
  } else {
    numCartItems = localCartFavIds.cart.length;
    numFavItems = localCartFavIds.fav.length;
  }

  return (
    <div className={cn(styles['page-nav'], className)}>
      <div className={styles['page-nav__inner']}>
        <Link className={styles['page-nav__logo']} href="/">
          <Image src="/images/logo.svg" alt="logo" style={{ objectFit: 'contain' }} fill />
        </Link>

        {categoriesQuery.isSuccess && (
          <Menu onCategoryChange={onCategoryChange} categories={categoriesQuery.data} />
        )}

        <div className={styles['page-nav__container']}>
          <Input
            className={styles['page-nav__search']}
            placeholder="Search for products..."
            size="m"
            type="search"
            setValue={setSearchText}
            value={searchText}
            onCorfim={() => onSearchTextConfirm(searchText)}
            predefinedContent={{ search: { onClick: () => onSearchTextConfirm(searchText) } }}
          />
          <button className={styles['page-nav__favorites']} onClick={onFavClick}>
            Favorites
            <span className={styles['page-nav__favorites-qty']}>{numFavItems}</span>
          </button>
          <span className={styles['page-nav__sep']} />
          <button className={styles['page-nav__cart']} onClick={onCartClick}>
            Cart
            <span className={styles['page-nav__cart-qty']}>{numCartItems}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
