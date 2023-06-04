import cn from 'classnames';
import { ReactNode } from 'react';
import Breadcrumbs from 'shared/ui/breadcrumbs';
import PageNav from './blocks/page-nav/page-nav';
import SiteNav from './blocks/site-nav/site-nav';
import styles from './styles/header.module.scss';

type Props = {
  className?: string;
  breadcrumbs: { text: string; link?: string }[];
  content?: ReactNode[];
  onCategoryChange: (id: number) => void;
  onSearchTextConfirm: (text: string) => void;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onCartClick: () => void;
  onFavClick: () => void;
};

export default function Header({
  className,
  breadcrumbs,
  content,
  onCategoryChange,
  onSearchTextConfirm,
  onSignInClick,
  onSignUpClick,
  onCartClick,
  onFavClick,
}: Props) {
  return (
    <div className={cn(styles['header'], className)}>
      <SiteNav onSignInClick={onSignInClick} onSignUpClick={onSignUpClick} />
      <PageNav
        onCategoryChange={onCategoryChange}
        onSearchTextConfirm={onSearchTextConfirm}
        onCartClick={onCartClick}
        onFavClick={onFavClick}
      />
      <div className={styles['header__extra']}>
        <div className={styles['header__extra-inner']}>
          <Breadcrumbs className={styles['header__breadcrumbs']} value={breadcrumbs} />
          <div className={styles['header__content']}>{content}</div>
        </div>
      </div>
    </div>
  );
}
