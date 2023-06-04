type Categories = { categoryId: number; categoryName: string; childs: Categories }[];

export function getCatalogCategoryBreadcrumbs(categories: Categories, categoryId: number) {
  const breadcrumbs: Categories = [];

  const getBreadcrumbsChain = (categories2: Categories) => {
    for (let i = 0; i < categories2.length; i += 1) {
      const el = categories2[i];
      if (el.categoryId === categoryId) {
        breadcrumbs.unshift(el);
        return true;
      }
      if (getBreadcrumbsChain(el.childs)) {
        breadcrumbs.unshift(el);
        return true;
      }
    }
  };
  getBreadcrumbsChain(categories);
  return breadcrumbs.map((el) => ({ text: el.categoryName }));
}
