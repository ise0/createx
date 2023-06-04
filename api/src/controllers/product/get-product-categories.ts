import { getProductCategories as modelGetProductCategories } from '@src/models/product';

export function getProductCategories() {
  return modelGetProductCategories();
}
