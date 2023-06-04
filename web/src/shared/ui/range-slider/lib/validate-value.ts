export function validateValue(
  value: { start: number; end: number },
  range: { min: number; max: number }
) {
  const newValue = { ...value };
  if (newValue.end > range.max) newValue.end = range.max;
  if (newValue.end < range.min) newValue.end = range.min;
  if (newValue.start > range.max) newValue.start = range.max;
  if (newValue.start < range.min) newValue.start = range.min;
  return newValue;
}
