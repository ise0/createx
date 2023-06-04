export function getPagesToDisplay(
  numElems: number,
  numPageElems: number,
  currentPage: number,
  numDisplayedPages: number
) {
  const numPages = Math.ceil(numElems / numPageElems) || 1;

  // eslint-disable-next-line no-param-reassign
  currentPage = currentPage > numPages || currentPage < 0 ? 1 : currentPage;

  const numPagesBySide = (numDisplayedPages - 1) / 2;
  const numPrevSidePages = Math.floor(numPagesBySide);
  const numNextSidePages = Math.ceil(numPagesBySide);

  let extraPrevPages = numNextSidePages + currentPage - numPages;
  extraPrevPages = extraPrevPages > 0 ? extraPrevPages : 0;

  let extraNextPages = numPrevSidePages + 1 - currentPage ;
  extraNextPages = extraNextPages > 0 ? extraNextPages : 0;

  let start = currentPage - numPrevSidePages - extraPrevPages;
  start = start > 0 ? start : 1;

  let end = currentPage + numNextSidePages + extraNextPages;
  end = end < numPages ? end : numPages;

  const pages: number[] = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return { pages, numPages,currentPage };
}
