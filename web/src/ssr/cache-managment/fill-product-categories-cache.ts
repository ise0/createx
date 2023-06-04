import { QueryClient } from '@tanstack/react-query';
import { CacheEntities, CacheEntityKey } from 'cache-entities';
import { getProductCategories } from 'ssr/model/product/get-product-categories';

export async function fillProductCategoriesCache(queryClient: QueryClient) {
  const productCategories = await getProductCategories();

  if (productCategories.error) return 'fail';

  queryClient.setQueryData<CacheEntities['productCategories']>(
    [CacheEntityKey.productCategories],
    productCategories.data
  );

  return 'success';
}
