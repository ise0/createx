import { getProduct as modelGetProduct } from '@src/models/product';

export async function getProduct(productId: number) {
  return modelGetProduct(productId);
}
