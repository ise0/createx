import cn from 'classnames';
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useRef, useState } from 'react';
import { useClick } from 'shared/lib/hooks';
import { Input } from 'shared/ui/input';
import styles from './styles/filter-wrapper.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  title: string;
  search?: { value: string; onChange: Dispatch<SetStateAction<string>> };
  searchPlaceholder?: string;
  contentMaxHeight?: string;
  content: ReactNode;
}>;

export default function Wrapper({
  className,
  content,
  title,
  search,
  searchPlaceholder,
  contentMaxHeight,
}: Props) {
  const [expanded, setExpanded] = useState(true);
  const ref = useRef<HTMLHeadingElement>(null);
  useClick(ref, () => setExpanded((value) => !value), [' ', 'Enter']);
  return (
    <div
      className={cn(
        styles['filter-wrapper'],
        { [styles['filter-wrapper_expanded']]: expanded },
        className
      )}
    >
      <h3
        className={styles['filter-wrapper__title']}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        ref={ref}
      >
        {title}
      </h3>
      {expanded && (
        <>
          {search && (
            <Input
              className={styles['filter-wrapper__search']}
              placeholder={searchPlaceholder}
              size="s"
              type="search"
              setValue={search.onChange}
              value={search.value}
              predefinedContent={{ search: { onClick: () => {} } }}
            />
          )}
          <div
            className={styles['filter-wrapper__content']}
            style={{ maxHeight: contentMaxHeight }}
          >
            {content}
          </div>
        </>
      )}
    </div>
  );
}
