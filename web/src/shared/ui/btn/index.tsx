import cn from 'classnames';
import React, { useRef } from 'react';
import { usePressState } from 'shared/lib/hooks';
import Icon from '../icon';
import { getStyles, Mods } from './styles';
import { type CommonProps } from './types';
import Link from 'next/link';

type Props = CommonProps & { icon?: Omit<Parameters<typeof Icon>[0], 'className'> } & Pick<
    Mods,
    'size' | 'theme'
  >;

export function Btn({ className, text = '', onClick, size, theme, icon, ...restProps }: Props) {
  const ref = useRef(null);
  const pressed = usePressState(ref, restProps.type === 'link' ? ['Enter'] : ['Enter', ' ']);

  const styles = getStyles({ size, theme, pressed });

  const commonProps = {
    className: cn(className, styles['btn']),
    onClick,
    ref,
  };

  return restProps.type === 'link' ? (
    <Link href={restProps.href} {...commonProps}>
      {!icon || <Icon className={styles['btn__icon']} {...icon} />}
      <span className={styles['btn__text']}>{text}</span>
    </Link>
  ) : (
    <button type={restProps.type} {...commonProps}>
      {!icon || <Icon className={styles['btn__icon']} {...icon} />}
      <span className={styles['btn__text']}>{text}</span>
    </button>
  );
}
