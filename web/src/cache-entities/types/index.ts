import { ProductCatalog } from './product-catalog';
import { CartProducts } from './cart-products';
import { FavProducts } from './fav-products';
import { ProductCategories } from './product-categories';

export type CacheEntities = {
  user: { userId: number; firstName: string; lastName?: string; email: string };
  productCatalog: ProductCatalog;
  userCartFavIds: {
    cart: { productId: number; productCharacteristicId?: number }[];
    fav: { productId: number; productCharacteristicId?: number }[];
  };
  userFavorites: FavProducts;
  userCart: CartProducts;
  localCart: CartProducts;
  localFavorites: FavProducts;
  productCategories: ProductCategories;
};
