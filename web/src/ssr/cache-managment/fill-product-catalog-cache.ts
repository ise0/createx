import { getProductCatalogByCategoryId, getProductCatalogByTS } from 'ssr/model/product';
import { QueryClient } from '@tanstack/react-query';
import { CacheEntities, CacheEntityKey } from 'cache-entities';

type SearchParams = {
  filters: {
    tagFilters: { filterId: string; tags: string[] }[];
    priceFilter?: { start: number; end: number };
  };
  sort: number;
  pagination: { offset: number; limit: number };
  searchBy: { type: 'categoryId'; value: number } | { type: 'textSearch'; value: string };
};

export async function fillProductCatalogCache(
  queryClient: QueryClient,
  { searchBy, ...searchParams }: SearchParams
) {
  const queryKeyWithoutSerializeError = JSON.parse(JSON.stringify({...searchParams, searchBy}));

  if (searchBy.type === 'categoryId') {
    const { data, error } = await getProductCatalogByCategoryId({
      ...searchParams,
      categoryId: searchBy.value,
    });
    if (error !== undefined) return 'fail';
    queryClient.setQueryData<CacheEntities['productCatalog']>(
      [CacheEntityKey.productCatalog, queryKeyWithoutSerializeError],
      data
    );
    return 'success';
  }
  const { data, error } = await getProductCatalogByTS({
    ...searchParams,
    textSearch: searchBy.value,
  });
  if (error !== undefined) return 'fail';
  queryClient.setQueryData<CacheEntities['productCatalog']>(
    [CacheEntityKey.productCatalog, queryKeyWithoutSerializeError],
    data
  );
}
