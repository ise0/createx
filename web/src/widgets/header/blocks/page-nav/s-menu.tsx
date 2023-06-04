import Link from 'next/link';
import cn from 'classnames';
import styles from './styles/page-nav.module.scss';
import { useEffect, useRef, useState } from 'react';

type Categories = { categoryId: number; categoryName: string; childs: Categories }[];
type Props = {
  categories: Categories;
  onCategoryChange: (id: number) => void;
};

export function Menu({ categories, onCategoryChange }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onOutsideClick = ({ target: evtTarget }: MouseEvent) => {
      if (ref.current === null || !(evtTarget instanceof HTMLElement)) return;
      if (!ref.current.contains(evtTarget)) {
        setActiveCategoryId(undefined);
      }
    };
    document.addEventListener('click', onOutsideClick, true);
    return () => document.removeEventListener('click', onOutsideClick, true);
  }, [activeCategoryId]);

  return (
    <ul className={cn(styles['page-nav__menu'], styles['s-menu__first-lvl'])}>
      {categories.map((firstLevel) => (
        <li className={styles['s-menu__first-lvl-item']} key={firstLevel.categoryId}>
          <button
            className={styles['s-menu__first-lvl-btn']}
            onMouseEnter={() => setActiveCategoryId(firstLevel.categoryId)}
            onClick={() => setActiveCategoryId(firstLevel.categoryId)}
          >
            {firstLevel.categoryName}
          </button>
          <div
            ref={ref}
            className={cn(styles['s-menu__popup'], {
              'visually-hidden': firstLevel.categoryId !== activeCategoryId,
            })}
            onMouseLeave={() => setActiveCategoryId(undefined)}
          >
            <ul className={styles['s-menu__second-lvl']}>
              {firstLevel.childs.map((secondLevel) => (
                <li className={styles['s-menu__second-lvl-item']} key={secondLevel.categoryId}>
                  <h3 className={styles['s-menu__second-lvl-title']}>{secondLevel.categoryName}</h3>
                  {secondLevel.childs && (
                    <ul className={styles['s-menu__third-lvl']}>
                      {secondLevel.childs.map((thirdLevel) => (
                        <li
                          className={styles['s-menu__third-lvl-item']}
                          key={thirdLevel.categoryId}
                        >
                          <Link
                            className={styles['s-menu__third-lvl-link']}
                            href={`/${thirdLevel.categoryId}`}
                            onClick={(evt) => {
                              evt.preventDefault();
                              onCategoryChange(thirdLevel.categoryId);
                            }}
                          >
                            {thirdLevel.categoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
