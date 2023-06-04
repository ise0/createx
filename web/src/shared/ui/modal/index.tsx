/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/modal.module.scss';

type Props = {
  children: ReactNode;
  autoClose?: () => void;
  alignX?: 'left' | 'center' | 'right';
  alignY?: 'top' | 'center' | 'bottom';
};

const AlignY = {
  top: 'top',
  center: 'middle',
  bottom: 'bottom',
};

export function Modal({ children, autoClose, alignX, alignY }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [pageElem, setPageElem] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const newPageElem = document.getElementById('page');
    if (!newPageElem) throw new Error();
    setPageElem(newPageElem);
  }, []);

  useEffect(() => {
    const onOutsideClick = (evt: Event) => {
      if (autoClose && modalRef.current && modalRef.current === evt.target) autoClose();
    };
    const onEsc = (evt: KeyboardEvent) => {
      if (autoClose && evt.key === 'Escape') autoClose();
    };
    document.addEventListener('click', onOutsideClick, true);
    document.addEventListener('keydown', onEsc, true);
    return () => {
      document.removeEventListener('click', onOutsideClick, true);
      document.removeEventListener('keydown', onEsc, true);
    };
  }, [autoClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const outerFocusElementRef = document.activeElement;
    modalRef.current?.focus({ preventScroll: true });
    return () => {
      if (outerFocusElementRef) (outerFocusElementRef as HTMLElement).focus();
    };
  }, []);

  if (!pageElem) return null;

  return ReactDOM.createPortal(
    <div className={styles['modal']} ref={modalRef} style={{ textAlign: alignX }} tabIndex={0}>
      <div className={styles['modal__inner']} style={{ verticalAlign: alignY && AlignY[alignY] }}>
        {children}
      </div>
      {autoClose && (
        <div
          className="visually-hidden"
          tabIndex={0}
          onFocus={autoClose}
          onBlur={(evt) => evt.preventDefault()}
        />
      )}
    </div>,
    pageElem
  );
}
