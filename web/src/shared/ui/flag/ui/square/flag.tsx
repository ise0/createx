import cn from 'classnames';
import { useRef, useState } from 'react';
import { usePressState } from 'shared/lib/hooks';
import styles from './styles/flag.module.scss';
import type { CommonProps } from '../types';

type Props = CommonProps;

export function FlagSquare({
  className,
  type,
  text,
  value,
  title,
  name,
  onChange,
  disabled,
}: Props) {
  const labelRef = useRef(null);
  const pressed = usePressState(labelRef, [' ']);
  const [focused, setFocused] = useState(false);

  return (
    <label
      className={cn(className, styles['flag'], {
        [styles['flag_pressed']]: pressed,
        [styles['flag_checked']]: value,
        [styles['flag_focused']]: focused,
        [styles['flag_disabled']]: disabled,
      })}
      ref={labelRef}
      title={title}
    >
      <input
        className="visually-hidden"
        type={type}
        name={name}
        onChange={() => onChange(value)}
        checked={value}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <span className={styles['flag__ctrl']}>{text}</span>
    </label>
  );
}
