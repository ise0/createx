import cn from 'classnames';
import { Dispatch, useMemo } from 'react';
import { getPagesToDisplay } from '../lib/pagination';
import styles from './styles/pagination.module.scss';

type Props = {
  className?: string;
  currentPage: number;
  setCurrentPage: Dispatch<number>;
  numDisplayedPages: number;
  numElems: number;
  elemsPerPage: number;
  showEndpoints?: boolean;
};

export function Pagination({
  className,
  setCurrentPage,
  elemsPerPage,
  numDisplayedPages,
  numElems,
  currentPage: initCurrentPage,
  showEndpoints = false,
}: Props) {
  const { pages, numPages, currentPage } = useMemo(
    () => getPagesToDisplay(numElems, elemsPerPage, initCurrentPage, numDisplayedPages),
    [numElems, elemsPerPage, initCurrentPage, numDisplayedPages]
  );

  return (
    <div className={cn(styles['pagination'], className)}>
      <button
        className={cn(styles['pagination__btn'], styles['pagination__btn_prev'])}
        aria-label="previous"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
      <ol className={styles['pagination__list']}>
        {showEndpoints && pages[0] > 1 && (
          <li
            className={cn(styles['pagination__endpoint-start'], {
              [styles['pagination__endpoint-start_dots']]: pages[0] > 2,
            })}
          >
            <button className={styles['pagination__page']} onClick={() => setCurrentPage(1)}>
              1
            </button>
          </li>
        )}
        {pages.map((el) => (
          <li key={el}>
            <button
              className={cn(styles['pagination__page'], {
                [styles['pagination__page_active']]: el === currentPage,
              })}
              onClick={() => setCurrentPage(el)}
            >
              {el}
            </button>
          </li>
        ))}
        {showEndpoints && pages[pages.length - 1] < numPages && (
          <li
            className={cn(styles['pagination__endpoint-end'], {
              [styles['pagination__endpoint-end_dots']]: numPages - pages[pages.length] > 1,
            })}
          >
            <button className={styles['pagination__page']} onClick={() => setCurrentPage(numPages)}>
              {numPages}
            </button>
          </li>
        )}
      </ol>
      <button
        className={cn(styles['pagination__btn'], styles['pagination__btn_next'])}
        aria-label="next"
        disabled={currentPage === numPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
}
