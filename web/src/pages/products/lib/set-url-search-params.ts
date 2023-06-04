import { NextRouter } from 'next/router';
import config from '../config';
import { SearchParams } from '../types';

export function setUrlSearchParams(
  router: NextRouter,
  { filters, sort, page, numElemsPerPage, searchBy }: SearchParams
) {
  router.query = {};

  filters.tagFilters.forEach((el) => {
    router.query[el.filterId] = el.tags.join(';');
  });

  if (filters.priceFilter !== undefined) {
    router.query.price = `${filters.priceFilter?.start};${filters.priceFilter?.end}`;
  }

  if (page > 1) router.query.page = page.toString();

  if (sort !== config.defaultSortId) router.query.sort = sort.toString();

  if (numElemsPerPage !== config.defaultCatalogPageElemsNum) {
    router.query.show = numElemsPerPage.toString();
  }

  if (searchBy.type === 'categoryId' && searchBy.value !== config.defaultCategoryId) {
    router.query.categoryId = searchBy.value.toString();
  }

  if (searchBy.type === 'textSearch') {
    router.query.search = searchBy.value;
  }
  
  router.replace(router, undefined, { shallow: true });
}
