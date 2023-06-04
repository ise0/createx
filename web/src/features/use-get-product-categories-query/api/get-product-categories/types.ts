import { ApiErrorCode, GraphqlError } from 'shared/api';

type ServerResponseCategories = [
  { category_id: number; category_name: string; childs: ServerResponseCategories }
];

export type ServerResponse =
  | {
      data: { productCategories: ServerResponseCategories };
      errors: undefined;
    }
  | { data: undefined; errors: [GraphqlError<ApiErrorCode.internalServerError, undefined>] };

export type Categories = { categoryId: number; categoryName: string; childs: Categories }[];
