import cn from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import { flagBoxGroupTemplate } from 'shared/ui/flag';
import FilterWrapper from '../filter-wrapper';
import styles from './styles/pick-many.module.scss';

type CheckGroupProps<T extends string | number> = {
  value: T[];
  name: string;
  options: { text: string; id: T; elementsNumber: number }[];
  disabled?: boolean | undefined;
  onChange: Dispatch<SetStateAction<T[]>>;
};

type Props<T extends string | number> = {
  className?: string;
  title: string;
  checkGroupProps: CheckGroupProps<T>;
};

export default function PickMany<T extends string | number>({
  className,
  title,
  checkGroupProps: { options, ...restCheckGroupProps },
}: Props<T>) {
  const [searchText, setSearchText] = useState('');
  const searchTextLowerCase = searchText.toLowerCase();
  return (
    <div className={cn(styles['pick-many'], className)}>
      <FilterWrapper
        title={title}
        search={{ value: searchText, onChange: setSearchText }}
        contentMaxHeight="166px"
        content={
          <ul className={styles['pick-many__list']}>
            {flagBoxGroupTemplate<T>({
              type: 'checkbox',
              options: options.filter((el) => el.text.toLowerCase().includes(searchTextLowerCase)),
              ...restCheckGroupProps,
            }).map((el, i) => (
              <li key={options[i].id} className={styles['pick-many__item']}>
                {el}
                <span
                  className={styles['pick-many__num-elems']}
                >{`(${options[i].elementsNumber})`}</span>
              </li>
            ))}
          </ul>
        }
      />
    </div>
  );
}
