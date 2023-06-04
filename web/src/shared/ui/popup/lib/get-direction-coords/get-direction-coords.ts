import getAvailableDirections from './get-available-direction';
import getCoordsByDirection from './get-coords-by-direction';

export type TDirections = [
  'top-center',
  'top-left',
  'top-right',
  'right-top',
  'right-center',
  'right-bottom',
  'bottom-center',
  'bottom-left',
  'bottom-right',
  'left-top',
  'left-center',
  'left-bottom'
];

export const getDirectionCoords = (
  anchor: HTMLElement,
  anchorViewportIOEntry: IntersectionObserverEntry,
  anchorBodyIOEntry: IntersectionObserverEntry,
  elem: HTMLElement,
  relative: 'page' | 'viewport',
  offset: number,
  prevDirection?: TDirections[number],
  priorityDirections?: Array<TDirections[number]>
): { direction: TDirections[number]; value: { left: number; top: number } } | undefined => {
  let availableDirections: TDirections[number][] = [];

  if (relative === 'viewport') {
    availableDirections = getAvailableDirections(
      anchor,
      anchorViewportIOEntry,
      elem,
      'viewport',
      offset
    );
  }

  if (availableDirections.length === 0) {
    availableDirections = getAvailableDirections(anchor, anchorBodyIOEntry, elem, 'page', offset);
  }

  if (availableDirections.length === 0) return undefined;

  let direction: TDirections[number] | undefined;

  if (priorityDirections) {
    direction = priorityDirections.find((el) => availableDirections.includes(el));
  }
  if (!direction && prevDirection && availableDirections.includes(prevDirection)) {
    direction = prevDirection;
  }
  if (!direction) {
    [direction] = availableDirections;
  }

  return {
    direction,
    value: getCoordsByDirection(anchor, elem, direction, offset),
  };
};
