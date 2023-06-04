import { RefObject, useEffect } from 'react';

export function useClick(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  pressKeys: string[] = []
) {
  useEffect(() => {
    const node = ref.current;
    node?.addEventListener('click', callback);

    return () => {
      node?.removeEventListener('click', callback);
    };
  }, [ref, callback]);

  useEffect(() => {
    const node = ref.current;
    const onKeyUp = (evt: KeyboardEvent) => {
      if (pressKeys.includes(evt.key)) {
        node?.removeEventListener('keyup', onKeyUp);
        callback();
      }
    };

    const onKeyDown = (evt: KeyboardEvent) => {
      if (pressKeys.includes(evt.key)) {
        if (evt.key === ' ') evt.preventDefault();
        node?.addEventListener('keyup', onKeyUp);
      }
    };

    node?.addEventListener('keydown', onKeyDown);

    return () => {
      node?.removeEventListener('keydown', onKeyDown);
      node?.removeEventListener('keyup', onKeyUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, callback, pressKeys.toString()]);
}
