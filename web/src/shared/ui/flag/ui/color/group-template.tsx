import { FlagColor } from './flag';
import { changeCheckBoxGroupValue } from '../../lib/change-checkbox-group-value';
import type { FlagGroupProps } from '../types';

export function flagColorGroupTemplate<T extends string | number>({
  className,
  name,
  disabled,
  options,
  type,
  value,
  onChange,
  size,
  hiddenText,
}: FlagGroupProps<T, { color: string }> &
  Pick<Parameters<typeof FlagColor>[0], 'size' | 'hiddenText'>) {
  if (type === 'radio') {
    return options.map((el) => (
      <FlagColor
        key={el.id}
        type="radio"
        className={className}
        name={name}
        disabled={disabled || el.disabled}
        value={value === el.id}
        onChange={() => onChange(el.id)}
        text={el.text}
        color={el.color}
        size={size}
        hiddenText={hiddenText}
      />
    ));
  }
  return options.map((el) => (
    <FlagColor
      key={el.id}
      type="checkbox"
      className={className}
      name={name}
      disabled={disabled || el.disabled}
      value={value.includes(el.id)}
      onChange={() => onChange(changeCheckBoxGroupValue(el.id))}
      text={el.text}
      color={el.color}
      size={size}
      hiddenText={hiddenText}
    />
  ));
}
