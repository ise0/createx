export function getValueByMousePosition(
  trackElem: HTMLElement,
  evt: { pageX: number },
  rangeAttrs:
    | { min: number; max: number; step: number }
    | { min: number; max: number; stepPercent: number }
) {
  const step =
    'step' in rangeAttrs
      ? rangeAttrs.step
      : Math.round((rangeAttrs.max - rangeAttrs.min) * (rangeAttrs.stepPercent / 100));

  const rect = trackElem.getBoundingClientRect();

  const percent = (evt.pageX - rect.x) / rect.width;
  const newValue = percent * (rangeAttrs.max - rangeAttrs.min) + rangeAttrs.min;
  const newValueByStep = Math.round(newValue / step) * step;

  return newValueByStep;
}
