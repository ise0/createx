import { FlagBox } from './flag';
import { changeCheckBoxGroupValue } from '../../lib/change-checkbox-group-value';
import type { FlagGroupProps } from '../types';

export function flagBoxGroupTemplate<T extends string | number>({
  className,
  name,
  disabled,
  options,
  type,
  value,
  onChange,
  style,
}: FlagGroupProps<T> & Pick<Parameters<typeof FlagBox>[0], 'style'>) {
  if (type === 'radio') {
    return options.map((el) => (
      <FlagBox
        key={el.id}
        type="radio"
        className={className}
        name={name}
        disabled={disabled || el.disabled}
        value={value === el.id}
        onChange={() => onChange(el.id)}
        text={el.text}
        style={style}
      />
    ));
  }
  return options.map((el) => (
    <FlagBox
      key={el.id}
      type="checkbox"
      className={className}
      name={name}
      disabled={disabled || el.disabled}
      value={value.includes(el.id)}
      onChange={() => onChange(changeCheckBoxGroupValue(el.id))}
      text={el.text}
      style={style}
    />
  ));
}
