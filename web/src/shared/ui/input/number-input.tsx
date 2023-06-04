import cn from 'classnames';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IncDec } from './blocks/incdec';
import { getStyles, Mods } from './styles';

export type Props = {
  className?: string;
  name?: string;
  placeholder?: string;
  ariaLabel?: string;
  content?: ReactNode;
  onConfirm?: () => void;
  onEndChange?: () => void;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  predefinedContent?: {
    incdec?: {};
  };
  typeAttrs?: { min?: number; max?: number };
} & Pick<Mods, 'size' | 'status'>;

export function NumberInput({
  className,
  name,
  placeholder = '',
  ariaLabel,
  typeAttrs = {},
  content,
  setValue,
  onConfirm,
  onEndChange,
  value,
  predefinedContent,
  size,
  status,
}: Props) {
  const [focused, setFocused] = useState<boolean>();
  const valueWasChanged = useRef(false);

  const validateValue = useCallback(
    (newValue: number) => {
      if (typeAttrs.min && newValue < typeAttrs.min) return typeAttrs.min;
      if (typeAttrs.max && newValue > typeAttrs.max) return typeAttrs.max;
      return newValue;
    },
    [typeAttrs.min, typeAttrs.max]
  );

  useEffect(() => {
    if (onEndChange && focused === false && valueWasChanged.current === true) {
      valueWasChanged.current = false;
      onEndChange();
      setFocused(undefined);
    }
  }, [focused, onEndChange]);

  const styles = getStyles({ size, status, focused });

  return (
    <span className={cn(className, styles['input'])}>
      <input
        className={styles['input__input']}
        value={`${value}`}
        onChange={(e) => {
          setValue(validateValue(+e.target.value));
          valueWasChanged.current = true;
        }}
        type="number"
        name={name}
        aria-label={ariaLabel}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(evt) => {
          if (onConfirm && evt.key === 'Enter') {
            valueWasChanged.current = false;
            onConfirm();
          }
        }}
      />

      <div className={styles['input__content']}>
        {predefinedContent?.incdec && (
          <IncDec setValue={setValue} validateValue={validateValue} onEndChange={onEndChange} />
        )}
        {content}
        {status === 'error' && <div className={styles['input__error-icon']} />}
      </div>
    </span>
  );
}
