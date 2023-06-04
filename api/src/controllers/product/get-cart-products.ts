import { getCartProducts as modelGetCartProducts } from '@src/models/product';

type ProductParam = {
  productId: number;
  productCharacteristicId?: number;
  quantity: number;
};

export function getCartProducts(products: ProductParam[]) {
  return modelGetCartProducts(products);
}
