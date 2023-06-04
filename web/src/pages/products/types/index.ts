export type FiltersValue = {
  tagFilters: {
    filterId: string;
    tags: string[];
  }[];
  priceFilter?: { start: number; end: number };
};

export type Filters = {
  tagFilters: {
    filterId: string;
    filterName: string;
    tags: { tag: string; tagView: unknown; elementsNumber: number }[];
  }[];
  priceFilter: { min: number; max: number };
};

export type FiltersView = {
  tag: (
    | {
        type: 'tag';
        filterId: string;
        title: string;
        options: { id: string; text: string; elementsNumber: number }[];
      }
    | {
        type: 'colorTag';
        filterId: string;
        title: string;
        options: { id: string; text: string; color: string; elementsNumber: number }[];
      }
  )[];
  price: {
    title: string;
    range: { min: number; max: number };
  };
};

type SearchBy = { type: 'categoryId'; value: number } | { type: 'textSearch'; value: string };

export type SearchParams = {
  filters: FiltersValue;
  sort: number;
  page: number;
  numElemsPerPage: number;
  searchBy: SearchBy;
};
