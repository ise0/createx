import cn from 'classnames';
import styles from './styles/filters.module.scss';
import PickColor from './blocks/color-filter';
import PickMany from './blocks/pick-many';
import RangeFilter from './blocks/range-filter';
import { useRef, useState } from 'react';
import { useChangeSearchParamsFilterValue } from 'pages/products/lib/change-filter-value';
import { getWithCallback } from 'shared/lib/with-callback';
import { QueryApplyPopup } from '../query-apply-popup';
import { useCatalogQueryKey } from 'pages/products/lib/catalog-query-key-context';
import { FiltersView } from 'pages/products/types';
import { useSearchParams } from 'pages/products/lib/search-params-context';

type Props = {
  className?: string;
  filters: FiltersView;
};

export function Filters({ className, filters }: Props) {
  const [searchParams] = useSearchParams();
  const changeSearchParamsFilterValue = useChangeSearchParamsFilterValue();
  const [showApplyPopup, setShowApplyPopup] = useState({
    value: false,
    updateTimestamp: 0,
  });
  const priceRef = useRef(null);
  const withUpdateQueryKeyPopup = getWithCallback(() =>
    setShowApplyPopup({ value: true, updateTimestamp: Date.now() })
  );
  const { updateCatalogQueryKey } = useCatalogQueryKey();
  const withUpdateQueryKey = getWithCallback(() => updateCatalogQueryKey());

  return (
    <div className={cn(styles['filters'], className)}>
      <div className={styles['filters__item']} ref={priceRef}>
        <RangeFilter
          title={filters.price.title}
          rangeAttrs={{ ...filters.price.range, stepPercent: 1 }}
          value={
            searchParams.filters.priceFilter || {
              start: filters.price.range.min,
              end: filters.price.range.max,
            }
          }
          tooltip
          onChange={withUpdateQueryKeyPopup((value) =>
            changeSearchParamsFilterValue({
              type: 'price',
              value,
              catalogPriceFilter: filters.price,
            })
          )}
        />
      </div>
      {filters.tag.map((el) => {
        const tagValue =
          searchParams.filters.tagFilters.find((valueItem) => valueItem.filterId === el.filterId)
            ?.tags || [];
        if (el.type === 'tag') {
          return (
            <PickMany
              className={styles['filters__item']}
              key={el.filterId}
              title={el.title}
              checkGroupProps={{
                options: el.options,
                value: tagValue,
                name: '',
                onChange: withUpdateQueryKey((newValue) =>
                  changeSearchParamsFilterValue({
                    type: 'tag',
                    id: el.filterId,
                    value: newValue,
                  })
                ),
              }}
            />
          );
        }
        return (
          <PickColor
            className={styles['filters__item']}
            key={el.filterId}
            title={el.title}
            checkGroupProps={{
              options: el.options,
              value: tagValue,
              name: '',
              onChange: withUpdateQueryKey((newValue) =>
                changeSearchParamsFilterValue({
                  type: 'tag',
                  id: el.filterId,
                  value: newValue,
                })
              ),
            }}
          />
        );
      })}
      {showApplyPopup.value && (
        <QueryApplyPopup
          showTimestamp={showApplyPopup.updateTimestamp}
          closePopup={() => setShowApplyPopup({ value: false, updateTimestamp: 0 })}
          directions={['right-top', 'right-center']}
          target={priceRef}
        />
      )}
    </div>
  );
}
