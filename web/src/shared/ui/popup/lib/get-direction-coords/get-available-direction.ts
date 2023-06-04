import type { TDirections } from './get-direction-coords';

const getAvailableDirections = (
  target: HTMLElement,
  targetIO: IntersectionObserverEntry,
  popup: HTMLElement,
  relative: 'viewport' | 'page',
  offset: number
): TDirections[number][] => {
  if (targetIO.intersectionRatio === 0 || !visualViewport) return [];

  const targetBCRect = targetIO.boundingClientRect;
  const targetIRect = targetIO.intersectionRect;
  const rectDeviation = {
    top: targetBCRect.top - targetIRect.top < -1,
    bottom: targetBCRect.bottom - targetIRect.bottom > 1,
    left: targetBCRect.left - targetIRect.left < -1,
    right: targetBCRect.right - targetIRect.right > 1,
  };

  const targetVRect = target.getBoundingClientRect();

  const availableSpaceTop =
    relative === 'viewport' ? visualViewport.scale * targetVRect.top : targetBCRect.top;
  const availableSpaceBottom =
    relative === 'viewport'
      ? visualViewport.height - visualViewport.scale * targetVRect.bottom
      : document.body.scrollHeight - targetBCRect.bottom;
  const availableSpaceLeft =
    relative === 'viewport'
      ? visualViewport.scale * targetVRect.left
      : window.scrollX + targetBCRect.left;
  const availableSpaceRight =
    relative === 'viewport'
      ? visualViewport.width - visualViewport.scale * targetVRect.right
      : document.body.scrollWidth - targetBCRect.right;

  const targetHeight = target.offsetHeight;
  const targetWidth = target.offsetWidth;
  const popupHeight = popup.offsetHeight;
  const popupWidth = popup.offsetWidth;

  const availableSides = [];

  if (!rectDeviation.left && !rectDeviation.right) {
    if (!rectDeviation.bottom && popupHeight + offset <= availableSpaceBottom)
      availableSides.push('bottom');
    if (!rectDeviation.top && popupHeight + offset <= availableSpaceTop) availableSides.push('top');
  }
  if (!rectDeviation.top && !rectDeviation.bottom) {
    if (!rectDeviation.right && popupWidth + offset <= availableSpaceRight) availableSides.push('right');
    if (!rectDeviation.left && popupWidth + offset <= availableSpaceLeft) availableSides.push('left');
  }

  const availableDirections: string[] = [];

  availableSides.forEach((side) => {
    if (side === 'top' || side === 'bottom') {
      if (
        (popupWidth - targetWidth) / 2 <= availableSpaceLeft &&
        (popupWidth - targetWidth) / 2 <= availableSpaceRight
      ) {
        availableDirections.push(`${side}-center`);
      }
      if (popupWidth - targetWidth <= availableSpaceRight) availableDirections.push(`${side}-left`);
      if (popupWidth - targetWidth <= availableSpaceLeft) availableDirections.push(`${side}-right`);
    }
    if (side === 'left' || side === 'right') {
      if (popupHeight - targetHeight <= availableSpaceBottom)
        availableDirections.push(`${side}-top`);
      if (
        (popupHeight - targetHeight) / 2 <= availableSpaceBottom &&
        (popupHeight - targetHeight) / 2 <= availableSpaceTop
      ) {
        availableDirections.push(`${side}-center`);
      }
      if (popupHeight - targetHeight <= availableSpaceTop)
        availableDirections.push(`${side}-bottom`);
    }
  });
  return availableDirections as TDirections[number][];
};

export default getAvailableDirections;
