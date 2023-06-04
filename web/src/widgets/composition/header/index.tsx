import { ReactNode, useState } from 'react';
import { CartModal } from 'widgets/cart-modal';
import { FavModal } from 'widgets/fav-modal';
import Header from 'widgets/header';
import { UserAuthModal } from 'widgets/user-auth-modal';

type Props = {
  className?: string;
  content?: ReactNode[];
  breadcrumbs: { text: string; link?: string }[];
  onCategoryChange: (id: number) => void;
  onSearchTextConfirm: (text: string) => void;
};

export function HeaderComposition({
  className,
  content,
  breadcrumbs,
  onCategoryChange,
  onSearchTextConfirm,
}: Props) {
  const [showAuthModal, setShowAuthModal] = useState<'signUp' | 'signIn'>();
  const [showCartFavModal, setShowCartFavModal] = useState<'cart' | 'fav'>();

  return (
    <div className={className}>
      <Header
        onCategoryChange={onCategoryChange}
        onSearchTextConfirm={onSearchTextConfirm}
        breadcrumbs={breadcrumbs}
        onSignInClick={() => setShowAuthModal('signIn')}
        onSignUpClick={() => setShowAuthModal('signUp')}
        onCartClick={() => setShowCartFavModal('cart')}
        onFavClick={() => setShowCartFavModal('fav')}
        content={content}
      />
      {showCartFavModal === 'cart' && (
        <CartModal closeModal={() => setShowCartFavModal(undefined)} />
      )}
      {showCartFavModal === 'fav' && <FavModal closeModal={() => setShowCartFavModal(undefined)} />}
      {showAuthModal !== undefined && (
        <UserAuthModal action={showAuthModal} closeModal={() => setShowAuthModal(undefined)} />
      )}
    </div>
  );
}
