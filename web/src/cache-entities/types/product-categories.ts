export type ProductCategories = {
  categoryId: number;
  categoryName: string;
  childs: ProductCategories;
}[];
