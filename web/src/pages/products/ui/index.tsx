import { useGetProductCategoriesQuery } from 'features/use-get-product-categories-query';
import { ReactNode, useEffect } from 'react';
import { HeaderComposition } from 'widgets/composition/header';
import { SearchParamsProvider, useSearchParams } from '../lib/search-params-context';
import { CatalogQueryKeyProvider, useCatalogQueryKey } from '../lib/catalog-query-key-context';
import { ActiveFilter } from './blocks/active-filter';
import { Products } from './blocks/products';
import styles from './styles/page.module.scss';
import { useChangeSearchParamsFilterValue } from '../lib/change-filter-value';
import { getCatalogCategoryBreadcrumbs } from '../lib/get-catalog-category-breadcrumbs';
import { useRouter } from 'next/router';
import { readUrlSearchParams } from '../lib/read-url-search-params';
import stringify from 'json-stable-stringify';

export function PageBody() {
  const [searchParams, setSearchParams] = useSearchParams();
  const changeSearchParamsFilterValue = useChangeSearchParamsFilterValue();
  const { updateCatalogQueryKey, catalogQueryKey } = useCatalogQueryKey();
  const productCategories = useGetProductCategoriesQuery({ staleTime: Infinity });
  const router = useRouter();
 
  useEffect(() => {
    const currentSearchParams = readUrlSearchParams(router.query);
    if (stringify(currentSearchParams) !== stringify(catalogQueryKey)) {
      setSearchParams(currentSearchParams);
      updateCatalogQueryKey();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  let breadcrumbs: { link?: string; text: string }[] = [];
  if (searchParams.searchBy.type === 'categoryId' && productCategories.data) {
    breadcrumbs = getCatalogCategoryBreadcrumbs(
      productCategories.data,
      searchParams.searchBy.value
    );
  } else if (searchParams.searchBy.type === 'textSearch') {
    breadcrumbs = [{ text: `search  "${searchParams.searchBy.value}"` }];
  }

  const activeFilterTags: ReactNode[] = [];
  searchParams.filters.tagFilters.forEach((el) =>
    el.tags.forEach((el2) => {
      activeFilterTags.push(
        <ActiveFilter
          key={`${el.filterId} ${el2}`}
          text={el2}
          removeFilter={() => {
            changeSearchParamsFilterValue({
              type: 'tag',
              id: el.filterId,
              value: el.tags.filter((elt) => elt !== el2),
            });
            updateCatalogQueryKey();
          }}
        />
      );
    })
  );

  return (
    <div id="page" className={styles['page']}>
      <HeaderComposition
        className={styles['page__header']}
        content={activeFilterTags}
        breadcrumbs={breadcrumbs}
        onCategoryChange={(value) => {
          setSearchParams((prevValue) => {
            return {
              filters: { tagFilters: [] },
              sort: prevValue.sort,
              numElemsPerPage: prevValue.numElemsPerPage,
              page: 1,
              searchBy: { type: 'categoryId', value },
            };
          });
          updateCatalogQueryKey();
        }}
        onSearchTextConfirm={(value) => {
          if (value === '') return;
          setSearchParams((prevValue) => {
            return {
              filters: { tagFilters: [] },
              sort: prevValue.sort,
              numElemsPerPage: prevValue.numElemsPerPage,
              page: 1,
              searchBy: { type: 'textSearch', value },
            };
          });
          updateCatalogQueryKey();
        }}
      />
      <Products />
    </div>
  );
}

export function Page() {
  return (
    <SearchParamsProvider>
      <CatalogQueryKeyProvider>
        <PageBody />
      </CatalogQueryKeyProvider>
    </SearchParamsProvider>
  );
}
