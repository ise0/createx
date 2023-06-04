export { getDirectionCoords } from './get-direction-coords';
export type { TDirections } from './get-direction-coords';

export function generateThresholdsArray(numSteps: number) {
  const thresholds = [];
  const stepInc = 1 / numSteps;
  for (let currentStep = 0; currentStep < numSteps; currentStep += 1) {
    thresholds.push(currentStep * stepInc);
  }
  thresholds.push(1);
  return thresholds;
}

export function findScrollableParents(element: HTMLElement): HTMLElement[] {
  const scrollableParents: HTMLElement[] = [];
  let parent = element.parentElement;

  while (parent && parent.tagName !== 'BODY') {
    if (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth)
      scrollableParents.push(parent);
    parent = parent.parentElement;
  }

  return scrollableParents;
}
