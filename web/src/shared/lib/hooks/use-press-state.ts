import { RefObject, useEffect, useState } from 'react';

export function usePressState(ref: RefObject<HTMLElement | null>, pressKeys: string[]) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const onMouseUp = () => {
      setPressed(false);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('dragend', onMouseUp);
    };
    const onMouseDown = (evt: MouseEvent) => {
      if (evt.buttons !== 1) return;
      setPressed(true);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('dragend', onMouseUp);
    };

    elem.addEventListener('mousedown', onMouseDown);

    return () => {
      setPressed(false);
      elem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('dragend', onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const onKeyUp = (evt: KeyboardEvent) => {
      if (pressKeys.includes(evt.key)) {
        setPressed(false);
        window.removeEventListener('keyup', onKeyUp);
      }
    };

    const onKeyDown = (evt: KeyboardEvent) => {
      if (pressKeys.includes(evt.key)) {
        if (evt.metaKey || evt.altKey || evt.ctrlKey) return;
        setPressed(true);
        window.addEventListener('keyup', onKeyUp);
      }
    };

    elem.addEventListener('keydown', onKeyDown);

    return () => {
      elem.removeEventListener('keydown', onKeyDown);
      window?.removeEventListener('keyup', onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, pressKeys.toString()]);

  return pressed;
}
