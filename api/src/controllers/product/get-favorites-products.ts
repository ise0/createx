import { getFavoritesProducts as modelGetFavoritesProducts } from '@src/models/product';

type ProductParam = {
  productId: number;
  productCharacteristicId?: number;
};

export function getFavoritesProducts(products: ProductParam[]) {
  return modelGetFavoritesProducts(products);
}
