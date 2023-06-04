import cn from 'classnames';
import { useCatalogQueryKey } from 'pages/products/lib/catalog-query-key-context';
import { useSearchParams } from 'pages/products/lib/search-params-context';
import { useRef, useState } from 'react';
import { getWithCallback } from 'shared/lib/with-callback';
import { flagBoxGroupTemplate } from 'shared/ui/flag';
import { Input } from 'shared/ui/input';
import { Popup } from 'shared/ui/popup';
import styles from './styles/sort-menu.module.scss';

type Props = {
  className?: string;
  sortElems: { id: number; name: string }[];
};

export function SortMenu({ className, sortElems }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sort } = searchParams;
  const { updateCatalogQueryKey } = useCatalogQueryKey();
  const [showSortPopup, setShowSortPopup] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const withQueryEnable = getWithCallback(() => updateCatalogQueryKey());

  const ignoredHtmlElems = [];
  if (sortRef.current !== null) ignoredHtmlElems.push(sortRef.current);
  return (
    <div className={cn(styles['sort-menu'], className)} ref={sortRef}>
      <Input
        className={styles['sort-menu__input']}
        size="m"
        type="text"
        setValue={() => {}}
        value={sortElems.find((el) => el.id === sort)?.name || ''}
        predefinedContent={{
          dropdown: {
            value: showSortPopup,
            onClick: () => setShowSortPopup((prevValue) => !prevValue),
          },
        }}
      />
      {showSortPopup && (
        <Popup
          target={sortRef}
          relative="page"
          directions={['bottom-right']}
          autoClose={{ func: () => setShowSortPopup(false), ignoredHtmlElems }}
        >
          <div className={styles['sort-menu__popup']}>
            {flagBoxGroupTemplate({
              type: 'radio',
              style: 'radio',
              name: 'sdf',
              options: sortElems.map((el) => ({ id: el.id, text: el.name })),
              onChange: withQueryEnable((value) =>
                setSearchParams((prevValue) => {
                  const newValue = typeof value === 'function' ? value(prevValue.page) : value;
                  return { ...prevValue, sort: newValue };
                })
              ),
              value: sort,
            })}
          </div>
        </Popup>
      )}
    </div>
  );
}
