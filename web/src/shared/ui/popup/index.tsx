/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/popup.module.scss';
import {
  findScrollableParents,
  generateThresholdsArray,
  getDirectionCoords,
  TDirections,
} from './lib';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  autoClose?: { func: () => void; ignoredHtmlElems: HTMLElement[] };
  hasFocus?: boolean;
  target: RefObject<HTMLElement>;
  relative: 'page' | 'viewport';
  directions?: Array<TDirections[number]>;
  offset?: number;
  forceUpdateCoords?: {};
};

export function Popup({
  children,
  autoClose,
  hasFocus,
  target,
  relative,
  directions,
  offset,
  forceUpdateCoords,
}: Props) {
  const [coords, setCoords] = useState<{
    direction: TDirections[number];
    value: { left: number; top: number };
  }>();
  const popupRef = useRef<HTMLDivElement>(null);
  const scrollableParentsRef = useRef<HTMLElement[]>([]);
  const targetViewportIO = useRef<IntersectionObserverEntry>();
  const targetPageIO = useRef<IntersectionObserverEntry>();
  const [pageElem, setPageElem] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const newPageElem = document.getElementById('page');
    if (!newPageElem) throw new Error();
    setPageElem(newPageElem);
  }, []);

  const targetElem = target.current;

  const updateCoords = useCallback(() => {
    if (targetViewportIO.current?.intersectionRatio === 0) return setCoords(undefined);

    setCoords((prevValue) => {
      if (popupRef.current && targetElem && targetViewportIO.current && targetPageIO.current) {
        const newCoords = getDirectionCoords(
          targetElem,
          targetViewportIO.current,
          targetPageIO.current,
          popupRef.current,
          relative,
          offset || 0,
          prevValue?.direction,
          directions
        );
        return newCoords;
      }
      return prevValue;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directions?.toString(), relative, targetElem, offset]);

  useEffect(() => updateCoords(), [forceUpdateCoords, updateCoords]);

  useEffect(() => {
    if (autoClose === undefined) return;

    const onOutsideClick = ({ target: evtTarget }: MouseEvent) => {
      if (popupRef.current === null || !(evtTarget instanceof HTMLElement)) return;

      if (
        !popupRef.current.contains(evtTarget) &&
        autoClose.ignoredHtmlElems.filter((el) => el.contains(evtTarget)).length === 0
      ) {
        autoClose.func();
      }
    };
    document.addEventListener('click', onOutsideClick, true);
    return () => document.removeEventListener('click', onOutsideClick, true);
  }, [autoClose]);

  useEffect(() => {
    if (hasFocus) {
      const outerFocusElementRef = document.activeElement;
      popupRef.current?.focus({ preventScroll: true });
      return () => {
        if (outerFocusElementRef) (outerFocusElementRef as HTMLElement).focus();
      };
    }
  }, [targetElem, hasFocus]);

  useEffect(() => {
    if (!targetElem) return;
    const findAndSetScrollableParents = () => {
      const scrollableParentsArr = findScrollableParents(targetElem);
      const unmountedParents = scrollableParentsRef.current.filter(
        (el) => !scrollableParentsArr.includes(el)
      );
      const newParents = scrollableParentsArr.filter((el) =>
        scrollableParentsRef.current.includes(el)
      );

      if (unmountedParents.length > 0) {
        unmountedParents.forEach((el) => el.removeEventListener('scroll', updateCoords));
      }
      if (newParents.length > 0) {
        newParents.forEach((el) => el.addEventListener('scroll', updateCoords));
      }

      scrollableParentsRef.current = scrollableParentsArr;
    };
    findAndSetScrollableParents();
    const timerId = setInterval(findAndSetScrollableParents, 1500);

    return () => {
      clearInterval(timerId);
      scrollableParentsRef.current.forEach((el) => el.removeEventListener('scroll', updateCoords));
    };
  }, [targetElem, updateCoords]);

  useEffect(() => {
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords);
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords);
    };
  }, [updateCoords]);

  useEffect(() => {
    if (!targetElem) return;
    const thresholdsArray = generateThresholdsArray(0);
    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        targetViewportIO.current = entry;
        updateCoords();
      },
      { threshold: thresholdsArray }
    );
    const pageObserver = new IntersectionObserver(
      ([entry]) => {
        targetPageIO.current = entry;
        updateCoords();
      },
      {
        threshold: thresholdsArray,
        root: pageElem,
      }
    );

    viewportObserver.observe(targetElem);
    pageObserver.observe(targetElem);
    return () => {
      viewportObserver.disconnect();
      pageObserver.disconnect();
    };
  }, [targetElem, pageElem, updateCoords]);

  if (!pageElem) return null;
  return ReactDOM.createPortal(
    <div className={cn(coords === undefined && 'visually-hidden')}>
      <div
        className={styles['popup']}
        ref={popupRef}
        style={{
          position: 'absolute',
          ...(coords ? { ...coords.value, zIndex: 1000 } : {}),
        }}
        tabIndex={hasFocus ? 0 : undefined}
      >
        {children}
        {autoClose && (
          <div
            tabIndex={0}
            onFocus={autoClose.func}
            style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
          />
        )}
      </div>
    </div>,
    pageElem
  );
}
