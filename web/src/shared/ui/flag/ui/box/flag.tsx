import cn from 'classnames';
import { useRef, useState } from 'react';
import { usePressState } from 'shared/lib/hooks';
import styles from './styles/flag.module.scss';
import type { CommonProps } from '../types';

export function FlagBox({
  className,
  type,
  text,
  title,
  name,
  value,
  onChange,
  disabled,
  style = 'checkbox',
}: CommonProps & { style?: 'radio' | 'checkbox' }) {
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
        [styles['flag_style_radio']]: style === 'radio',
        [styles['flag_style_checkbox']]: style === 'checkbox',
      })}
      ref={labelRef}
      title={title}
    >
      <input
        className={styles['flag__input']}
        type={type}
        name={name}
        onChange={() => onChange((prevValue) => !prevValue)}
        checked={value}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <span className={styles['flag__ctrl']} />
      <span className={styles['flag__label']}>{text}</span>
    </label>
  );
}
