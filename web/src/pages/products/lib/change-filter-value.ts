import { SetStateAction } from 'react';
import { FiltersValue, FiltersView } from '../types';
import { useSearchParams } from './search-params-context';

export function useChangeSearchParamsFilterValue() {
  const [, setSearchParams] = useSearchParams();

  return (
    filter:
      | {
          type: 'tag';
          id: string;
          value: SetStateAction<string[]>;
        }
      | {
          type: 'price';
          catalogPriceFilter: FiltersView['price'];
          value: SetStateAction<{
            start: number;
            end: number;
          }>;
        }
  ) =>
    setSearchParams((prevValue) => {
      if (filter.type === 'tag') {
        const { tagFilters } = prevValue.filters;
        const prevFilterIndex = tagFilters.findIndex((el) => el.filterId === filter.id);
        let newFilterValue: FiltersValue['tagFilters'][number];
        if (typeof filter.value === 'function') {
          const prevFilterValue = prevFilterIndex >= 0 ? tagFilters[prevFilterIndex].tags : [];
          newFilterValue = { filterId: filter.id, tags: filter.value(prevFilterValue) };
        } else {
          newFilterValue = { filterId: filter.id, tags: filter.value };
        }
        const newFiltersValue =
          newFilterValue.tags.length > 0
            ? [
                ...tagFilters.slice(0, prevFilterIndex),
                newFilterValue,
                ...tagFilters.slice(prevFilterIndex + 1),
              ]
            : [...tagFilters.slice(0, prevFilterIndex), ...tagFilters.slice(prevFilterIndex + 1)];

        return { ...prevValue, filters: { ...prevValue.filters, tagFilters: newFiltersValue } };
      }
      if (filter.type === 'price') {
        let newFilterValue: FiltersValue['priceFilter'];
        if (typeof filter.value === 'function') {
          newFilterValue = filter.value(
            prevValue.filters.priceFilter || {
              start: filter.catalogPriceFilter.range.min,
              end: filter.catalogPriceFilter.range.max,
            }
          );
        } else {
          newFilterValue = filter.value;
        }

        return { ...prevValue, filters: { ...prevValue.filters, priceFilter: newFilterValue } };
      }

      return prevValue;
    });
}
