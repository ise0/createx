import { Filters, FiltersView } from '../types';

export function getFiltersArray({ tagFilters, priceFilter }: Filters) {
  const tagfiltersView: FiltersView['tag'] = [];
  tagFilters.map((el) => {
    if (el.filterId === 'color') {
      tagfiltersView.push({
        type: 'colorTag',
        filterId: el.filterId,
        title: el.filterName,
        options: el.tags.map((el2) => ({
          id: el2.tag,
          text: (el2.tagView as { text: string; hex: string }).text,
          color: (el2.tagView as { text: string; hex: string }).hex,
          elementsNumber: el2.elementsNumber,
        })),
      });
    } else {
      tagfiltersView.push({
        type: 'tag',
        filterId: el.filterId,
        title: el.filterName,
        options: el.tags.map((el2) => ({
          id: el2.tag,
          text: (el2.tagView as { text: string }).text,
          elementsNumber: el2.elementsNumber,
        })),
      });
    }
  });
  const priceFilterView: FiltersView['price'] = {
    title: 'Price',
    range: { min: priceFilter.min, max: priceFilter.max },
  };

  return {
    tag: tagfiltersView.sort((a, b) => {
      if (a.type === 'colorTag' && b.type === 'colorTag') return 0;
      if (a.type === 'colorTag') return -1;
      return 1;
    }),
    price: priceFilterView,
  };
}
