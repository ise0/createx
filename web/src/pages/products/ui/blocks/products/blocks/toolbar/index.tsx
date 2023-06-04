import cn from 'classnames';
import config from 'pages/products/config';
import { useCatalogQueryKey } from 'pages/products/lib/catalog-query-key-context';
import { useSearchParams } from 'pages/products/lib/search-params-context';
import { SetStateAction, useCallback, useRef, useState } from 'react';
import { Btn } from 'shared/ui/btn';
import { Input } from 'shared/ui/input';
import { Pagination } from 'shared/ui/pagination';
import { QueryApplyPopup } from '../query-apply-popup';
import { SortMenu } from '../sort-menu';
import styles from './styles/toolbar.module.scss';

type Props = {
  className?: string;
  showFilters: boolean;
  numElems: number;
  onShowFiltersClick: () => void;
  sortElems: { id: number; name: string }[];
};

export function Toolbar({
  className,
  numElems,
  showFilters,
  onShowFiltersClick,
  sortElems,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, numElemsPerPage } = searchParams;
  const { updateCatalogQueryKey } = useCatalogQueryKey();
  const numPageElemsRef = useRef(null);
  const sortRef = useRef(null);
  const [showApplyPopup, setShowApplyPopup] = useState({
    value: false,
    updateTimestamp: 0,
  });

  const setElemsPerPage = useCallback(
    (value: SetStateAction<number>) => {
      setSearchParams((prevValue) => {
        const newValue = typeof value === 'function' ? value(prevValue.numElemsPerPage) : value;
        return { ...prevValue, numElemsPerPage: newValue };
      });
      setShowApplyPopup({ value: true, updateTimestamp: Date.now() });
    },
    [setShowApplyPopup, setSearchParams]
  );

  return (
    <div className={cn(styles['toolbar'], className)}>
      <Btn
        className={styles['toolbar__filters-btn']}
        icon={{ link: '/images/controls.svg' }}
        type="button"
        text={showFilters ? 'Hide filters' : 'Show filters'}
        size="m"
        theme="solid"
        onClick={onShowFiltersClick}
      />

      <label ref={sortRef} className={styles['toolbar__input']}>
        <span className={styles['toolbar__input-title']}>Sort by</span>
        <SortMenu sortElems={sortElems} />
      </label>

      <label className={styles['toolbar__input']}>
        <span className={styles['toolbar__input-title']}>Show</span>
        <span className={styles['toolbar__input-page-wrapper']} ref={numPageElemsRef}>
          <Input
            className={styles['toolbar__input-page']}
            size="m"
            type="number"
            value={numElemsPerPage}
            typeAttrs={{ min: 1, max: config.catalogPageMaxElemsNum }}
            setValue={setElemsPerPage}
            predefinedContent={{ incdec: {} }}
          />
        </span>
        <span className={styles['toolbar__input-post-title']}> products per page</span>
      </label>
      <Pagination
        className={styles['toolbar__pagintaion']}
        showEndpoints
        currentPage={page}
        numDisplayedPages={3}
        elemsPerPage={numElemsPerPage}
        numElems={numElems}
        setCurrentPage={(value) => {
          if (value === page) return;
          setSearchParams((prevValue) => ({ ...prevValue, page: value }));
          updateCatalogQueryKey();
        }}
      />

      {showApplyPopup.value && (
        <QueryApplyPopup
          showTimestamp={showApplyPopup.updateTimestamp}
          closePopup={() => setShowApplyPopup({ value: false, updateTimestamp: 0 })}
          directions={['right-top', 'right-center']}
          target={numPageElemsRef}
        />
      )}
    </div>
  );
}
