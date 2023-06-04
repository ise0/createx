import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import config from '../config';
import { SearchParams } from '../types';

export function readUrlSearchParams(query: NextParsedUrlQuery): SearchParams {
  const getTagFiltersEntries = Object.entries(query).filter(([key, value]) => {
    if (
      ['page', 'sort', 'show', 'price', 'categoryId', 'search'].includes(key) ||
      typeof value !== 'string'
    ) {
      return false;
    }
    return true;
  }) as [string, string][];

  const tagFilters = getTagFiltersEntries.map(([key, value]) => {
    return { filterId: key, tags: value.split(';') };
  });

  const page = query.page !== undefined ? Number(query.page) : 1;

  const sort = query.sort !== undefined ? Number(query.sort) : config.defaultSortId;

  let numElemsPerPage = config.defaultCatalogPageElemsNum;
  if (query.show !== undefined) {
    const showNum = Math.round(Number(query.show));
    if (showNum > config.catalogPageMaxElemsNum) numElemsPerPage = config.catalogPageMaxElemsNum;
    else if (showNum > 0) numElemsPerPage = showNum;
  }

  let searchBy: SearchParams['searchBy'];
  if (query.categoryId !== undefined) {
    searchBy = { type: 'categoryId', value: Number(query.categoryId) };
  } else if (query.search !== undefined) {
    searchBy = { type: 'textSearch', value: query.search.toString() };
  } else {
    searchBy = { type: 'categoryId', value: config.defaultCategoryId };
  }

  let priceFilter: SearchParams['filters']['priceFilter'];
  if (typeof query.price === 'string') {
    const start = Number(query.price.slice(0, query.price.indexOf(';')));
    const end = Number(query.price.slice(query.price.indexOf(';') + 1));
    priceFilter = { start, end };
  }

  return { filters: { tagFilters, priceFilter }, numElemsPerPage, page, searchBy, sort };
}
