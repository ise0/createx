import cn from 'classnames';
import { Dispatch, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { Dropdown } from './blocks/dropdown';
import { Search } from './blocks/search';
import { ShowPassword } from './blocks/show-password';
import { getStyles, Mods } from './styles';

export type Props = {
  className?: string;
  name?: string;
  placeholder?: string;
  ariaLabel?: string;
  typeAttrs?: InputHTMLAttributes<HTMLInputElement>;
  content?: ReactNode;
  onCorfim?: () => void;
  onEndChange?: () => void;
  type: string;
  value: string | number;
  setValue: Dispatch<string>;
  predefinedContent?: {
    showPassword?: {};
    search?: { onClick: () => void };
    dropdown?: {
      value: boolean;
      onClick: () => void;
    };
  };
} & Pick<Mods, 'size' | 'status'>;

export function TextInput({
  className,
  name,
  placeholder = '',
  ariaLabel,
  typeAttrs = {},
  content,
  setValue,
  onCorfim,
  onEndChange,
  type: typeAttr,
  value,
  predefinedContent,
  size,
  status,
}: Props) {
  const [type, setType] = useState(typeAttr);
  useEffect(() => setType(typeAttr), [typeAttr]);
  const [focused, setFocused] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const styles = getStyles({ size, status, focused });

  return (
    <span className={cn(className, styles['input'])}>
      <input
        className={styles['input__input']}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setWasChanged(true);
        }}
        type={type}
        name={name}
        aria-label={ariaLabel}
        placeholder={placeholder}
        {...typeAttrs}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          if (onEndChange && wasChanged) {
            setWasChanged(false);
            onEndChange();
          }
        }}
        onKeyDown={(evt) => {
          if (onCorfim && evt.key === 'Enter') {
            setWasChanged(false);
            onCorfim();
          }
        }}
      />

      <div className={styles['input__content']}>
        {predefinedContent?.showPassword && <ShowPassword setType={setType} />}
        {predefinedContent?.dropdown && <Dropdown {...predefinedContent.dropdown} />}
        {predefinedContent?.search && <Search onClick={predefinedContent.search.onClick} />}
        {content}
        {status === 'error' && <div className={styles['input__error-icon']} />}
      </div>
    </span>
  );
}
