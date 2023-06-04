import { useCatalogQueryKey } from 'pages/products/lib/catalog-query-key-context';
import { RefObject, useEffect, useRef } from 'react';
import { Btn } from 'shared/ui/btn';
import { Popup } from 'shared/ui/popup';

type Props = {
  target: RefObject<HTMLElement>;
  closePopup: () => void;
  directions: Parameters<typeof Popup>['0']['directions'];
  showTimestamp: number;
};

export function QueryApplyPopup({ target, closePopup, directions, showTimestamp }: Props) {
  const { updateCatalogQueryKey } = useCatalogQueryKey();
  const closePopupRef = useRef(closePopup);
  closePopupRef.current = closePopup;

  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    timer.current = setTimeout(() => closePopupRef.current(), 2000);
    return () => clearTimeout(timer.current);
  }, [showTimestamp]);

  return (
    <Popup target={target} relative="page" directions={directions}>
      <div
        onPointerOver={() => {
          clearTimeout(timer.current);
        }}
        onPointerLeave={() => {
          timer.current = setTimeout(() => {
            closePopup();
          }, 2000);
        }}
      >
        <Btn
          text="Accept"
          type="button"
          size="s"
          theme="outline"
          onClick={() => {
            updateCatalogQueryKey();
            closePopup();
          }}
        />
      </div>
    </Popup>
  );
}
