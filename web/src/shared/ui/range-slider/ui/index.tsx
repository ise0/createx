/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import cn from 'classnames';
import { Dispatch, SetStateAction, useState, useEffect, useRef, MouseEventHandler } from 'react';
import styles from './styles/slider.module.scss';
import { getValueByMousePosition } from '../lib/get-value-by-mouse-position';
import { validateValue } from '../lib/validate-value';
import { Popup } from 'shared/ui/popup';

type Value = { start: number; end: number };

type Props = {
  className?: string;
  value: Value;
  setValue: Dispatch<SetStateAction<Value>>;
  rangeAttrs:
    | { min: number; max: number; step: number }
    | { min: number; max: number; stepPercent: number };
  tooltip?: boolean;
};

export function RangeSlider({ className, setValue, rangeAttrs, value, tooltip }: Props) {
  const [startFocus, setStartFocus] = useState(false);
  const [endFocus, setEndFocus] = useState(false);
  const refStartInput = useRef<HTMLInputElement>(null);
  const refEndInput = useRef<HTMLInputElement>(null);
  const refTrack = useRef<HTMLDivElement>(null);
  const refStartThumb = useRef<HTMLDivElement>(null);
  const refEndThumb = useRef<HTMLDivElement>(null);
  const [thumbPressed, setThumbPressed] = useState(false);

  useEffect(() => {
    if (!thumbPressed) return;
    const setThumbPressedFalse = () => setThumbPressed(false);
    window.addEventListener('pointerup', setThumbPressedFalse);
    return () => window.removeEventListener('pointerup', setThumbPressedFalse);
  }, [thumbPressed]);

  const step =
    'step' in rangeAttrs
      ? rangeAttrs.step
      : Math.round((rangeAttrs.max - rangeAttrs.min) * (rangeAttrs.stepPercent / 100));

  const changeValueByTrackClick: MouseEventHandler<HTMLDivElement> = (evt) => {
    if (!refTrack.current || rangeAttrs.max === rangeAttrs.min) return;
    const newValue = getValueByMousePosition(refTrack.current, evt, rangeAttrs);

    let isStart;
    if (value.start === value.end) {
      isStart = newValue < value.start;
    } else {
      isStart = newValue - value.start < value.end - newValue;
    }

    if (isStart) {
      setValue((p) => validateValue({ ...p, start: newValue }, rangeAttrs));
      refStartInput.current?.focus({ preventScroll: true });
    } else {
      setValue((p) => validateValue({ ...p, end: newValue }, rangeAttrs));
      refEndInput.current?.focus({ preventScroll: true });
    }
  };

  useEffect(() => {
    if (!thumbPressed) return;

    const changeValueByMoveThumb = (evt: MouseEvent) => {
      if (!refTrack.current || rangeAttrs.max === rangeAttrs.min) return;
      const newValue = getValueByMousePosition(refTrack.current, evt, rangeAttrs);

      if (startFocus) {
        if (newValue <= value.end) {
          setValue((p) => validateValue({ ...p, start: newValue }, rangeAttrs));
        } else {
          refEndInput.current?.focus({ preventScroll: true });
          setValue((p) => validateValue({ start: p.end, end: newValue }, rangeAttrs));
        }
      } else if (endFocus) {
        if (newValue >= value.start) {
          setValue((p) => validateValue({ ...p, end: newValue }, rangeAttrs));
        } else {
          refStartInput.current?.focus({ preventScroll: true });
          setValue((p) => validateValue({ start: newValue, end: p.start }, rangeAttrs));
        }
      }
    };

    window.addEventListener('pointermove', changeValueByMoveThumb);
    return () => window.removeEventListener('pointermove', changeValueByMoveThumb);
  }, [thumbPressed, startFocus, endFocus, value, rangeAttrs, setValue]);

  const { start, end } = validateValue(value, rangeAttrs);
  return (
    <div className={cn(styles['slider'], className)}>
      {tooltip && (startFocus || endFocus) && (
        <Popup
          target={startFocus ? refStartThumb : refEndThumb}
          relative="page"
          directions={['top-center', 'top-left', 'top-right']}
          offset={2}
          forceUpdateCoords={{}}
        >
          <div className={styles['slider__tooltip']}>{startFocus ? start : end}</div>
        </Popup>
      )}
      <div className={cn(styles['slider__inner'], className)} ref={refTrack}>
        <div
          className={styles['slider__track']}
          onClick={changeValueByTrackClick}
          onDragStart={(e) => e.preventDefault()}
        >
          <div
            className={styles['slider__track-active']}
            style={{
              marginLeft: `${
                ((start - rangeAttrs.min) / (rangeAttrs.max - rangeAttrs.min)) * 100
              }%`,
              width: `${((end - start) / (rangeAttrs.max - rangeAttrs.min)) * 100}%`,
            }}
          />
        </div>
        <div
          style={{
            left: `${((start - rangeAttrs.min) / (rangeAttrs.max - rangeAttrs.min)) * 100}%`,
          }}
          onPointerDown={(e) => {
            setThumbPressed(true);
            e.preventDefault();
            refStartInput.current?.focus({ preventScroll: true });
          }}
          aria-hidden
          onDragStart={(e) => e.preventDefault()}
          className={cn(styles['slider__thumb'], {
            [styles['slider__thumb_active']]: startFocus,
          })}
          ref={refStartThumb}
        />
        <div
          style={{ left: `${((end - rangeAttrs.min) / (rangeAttrs.max - rangeAttrs.min)) * 100}%` }}
          onPointerDown={(e) => {
            setThumbPressed(true);
            e.preventDefault();
            refEndInput.current?.focus({ preventScroll: true });
          }}
          aria-hidden
          onDragStart={(e) => e.preventDefault()}
          className={cn(styles['slider__thumb'], {
            [styles['slider__thumb_active']]: endFocus,
          })}
          ref={refEndThumb}
        />

        <input
          ref={refStartInput}
          className="visually-hidden"
          type="range"
          onChange={(e) =>
            setValue((p) => validateValue({ ...p, start: +e.target.value }, rangeAttrs))
          }
          value={start}
          onFocus={() => setStartFocus(true)}
          onBlur={() => setStartFocus(false)}
          min={rangeAttrs.min}
          max={rangeAttrs.max}
          step={step}
        />
        <input
          ref={refEndInput}
          className="visually-hidden"
          type="range"
          onChange={(e) =>
            setValue((p) => validateValue({ ...p, end: +e.target.value }, rangeAttrs))
          }
          value={end}
          onFocus={() => setEndFocus(true)}
          onBlur={() => setEndFocus(false)}
          min={rangeAttrs.min}
          max={rangeAttrs.max}
          step={step}
        />
      </div>
    </div>
  );
}
