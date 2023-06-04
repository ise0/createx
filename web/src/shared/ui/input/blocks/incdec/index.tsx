/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from './styles/incdec.module.scss';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { usePressState } from 'shared/lib/hooks';

type Props = {
  setValue: Dispatch<SetStateAction<number>>;
  validateValue: (newValue: number) => number;
  onEndChange?: () => void;
};

export function IncDec({ setValue, validateValue, onEndChange }: Props) {
  const incRef = useRef<HTMLDivElement | null>(null);
  const decRef = useRef<HTMLDivElement | null>(null);
  const incPressed = usePressState(incRef, [' ', 'Enter']);
  const decPressed = usePressState(decRef, [' ', 'Enter']);

  const [changesFinished, setChangesFinished] = useState(false);
  const changeByHoldRef = useRef({ inc: false, dec: false });
  const onEndChangeRef = useRef(onEndChange);
  onEndChangeRef.current = onEndChange;

  useEffect(() => {
    if (changesFinished === false) return;
    if (onEndChangeRef.current) onEndChangeRef.current();
    setChangesFinished(false);
  }, [changesFinished]);

  useEffect(() => {
    if (changeByHoldRef.current.dec === true && decPressed === false) {
      setChangesFinished(true);
      changeByHoldRef.current.dec = false;
    } else if (changeByHoldRef.current.inc === true && incPressed === false) {
      setChangesFinished(true);
      changeByHoldRef.current.inc = false;
    }
  }, [incPressed, decPressed]);

  useEffect(() => {
    if (incPressed) {
      let incdecInterval: NodeJS.Timer;
      const delayTimer = setTimeout(() => {
        incdecInterval = setInterval(() => {
          changeByHoldRef.current.inc = true;
          setValue((prevValue) => validateValue(prevValue + 1));
        }, 50);
      }, 200);
      return () => {
        clearTimeout(delayTimer);
        clearInterval(incdecInterval);
      };
    }
  }, [incPressed, setValue, validateValue]);

  useEffect(() => {
    if (decPressed) {
      let incdecInterval: NodeJS.Timer;
      const delayTimer = setTimeout(() => {
        incdecInterval = setInterval(() => {
          changeByHoldRef.current.dec = true;
          setValue((prevValue) => validateValue(prevValue - 1));
        }, 50);
      }, 200);
      return () => {
        clearTimeout(delayTimer);
        clearInterval(incdecInterval);
      };
    }
  }, [decPressed, setValue, validateValue]);

  return (
    <div className={styles['incdec']}>
      <div
        className={styles['incdec__inc']}
        onClick={() => {
          if (changeByHoldRef.current.inc === false) {
            setValue((prevValue) => validateValue(prevValue + 1));
            setChangesFinished(true);
          }
        }}
        ref={incRef}
        aria-label="inc number"
      />
      <div
        className={styles['incdec__dec']}
        onClick={() => {
          if (changeByHoldRef.current.dec === false) {
            setValue((prevValue) => validateValue(prevValue - 1));
            setChangesFinished(true);
          }
        }}
        ref={decRef}
        aria-label="dec number"
      />
    </div>
  );
}
