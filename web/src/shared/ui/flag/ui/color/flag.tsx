import cn from 'classnames';
import { useRef, useState } from 'react';
import { usePressState } from 'shared/lib/hooks';
import { getStyles, Mods } from './styles';
import type { CommonProps } from '../types';

type Props = CommonProps & { color: string } & Mods;

export function FlagColor({
  className,
  type,
  text,
  value,
  title,
  name,
  onChange,
  disabled,
  color,
  hiddenText,
  size,
}: Props) {
  const labelRef = useRef(null);
  const pressed = usePressState(labelRef, [' ']);
  const [focused, setFocused] = useState(false);
  const styles = getStyles({ hiddenText, size });

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
        className={styles['flag__input']}
        type={type}
        name={name}
        onChange={() => onChange(value)}
        checked={value}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <span className={styles['flag__ctrl']} style={{ backgroundColor: color }} />
      <span className={styles['flag__label']}>{text}</span>
    </label>
  );
}
