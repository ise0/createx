import cn from 'classnames';
import { useGetProductCatalogQuery } from 'features/use-get-product-catalog-query';
import { getFiltersArray } from 'pages/products/lib/get-filters-array';
import { useCatalogQueryKey } from 'pages/products/lib/catalog-query-key-context';
import { useMemo, useState } from 'react';
import { Catalog } from './blocks/catalog';
import { Filters } from './blocks/filters';
import { Toolbar } from './blocks/toolbar';
import styles from './styles/products.module.scss';

type TProductsProps = {
  className?: string;
};

export function Products({ className }: TProductsProps) {
  const [showFilters, setShowFilters] = useState(true);
  const { catalogQueryKey } = useCatalogQueryKey();

  const productCatalog = useGetProductCatalogQuery(
    {
      cacheTime: 0,
      staleTime: Infinity,
      keepPreviousData: true,
    },
    {
      filters: catalogQueryKey.filters,
      sort: catalogQueryKey.sort,
      pagination: {
        offset: (catalogQueryKey.page - 1) * catalogQueryKey.numElemsPerPage,
        limit: catalogQueryKey.numElemsPerPage,
      },
      searchBy: catalogQueryKey.searchBy,
    }
  );

  const filtersView = useMemo(() => {
    if (productCatalog.data) return getFiltersArray(productCatalog.data.filters);
  }, [productCatalog.data]);

  return (
    <section
      className={cn(styles['products'], className, {
        [styles['products_loading']]: productCatalog.isFetching,
      })}
      aria-label="products"
    >
      {productCatalog.data && (
        <>
          <Toolbar
            className={styles['products__toolbar']}
            showFilters={showFilters}
            onShowFiltersClick={() => setShowFilters((state) => !state)}
            numElems={productCatalog.data.elementsNumber}
            sortElems={productCatalog.data.sort}
          />
          <div className={styles['products__layout']}>
            {showFilters && filtersView && (
              <Filters className={styles['products__filters']} filters={filtersView} />
            )}
            <Catalog
              className={styles['products__catalog']}
              products={productCatalog.data.elements}
            />
          </div>
        </>
      )}
    </section>
  );
}
