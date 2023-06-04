const getCoordsByDirection = (
  anchor: HTMLElement,
  elem: HTMLElement,
  direction: string,
  offset: number
): { left: number; top: number } => {
  const anchorRect = anchor.getBoundingClientRect();
  const anchorLeft = anchorRect.left + window.scrollX;
  const anchorTop = anchorRect.top + window.scrollY;
  const anchorRight = anchorRect.right + window.scrollX;
  const anchorBottom = anchorRect.bottom + window.scrollY;

  const elemHeight = elem.offsetHeight;
  const elemWidth = elem.offsetWidth;

  const sepIndex = direction.indexOf('-');
  const side = direction.slice(0, sepIndex);
  const position = direction.slice(sepIndex + 1);

  let x = 0;
  let y = 0;

  switch (side) {
    case 'top':
      y = anchorTop - (elemHeight + offset);
      break;
    case 'bottom':
      y = anchorBottom + offset;
      break;
    case 'right':
      x = anchorRight + offset;
      break;
    case 'left':
      x = anchorLeft - (elemWidth + offset);
      break;
    default:
  }
  switch (position) {
    case 'top':
      y = anchorTop;
      break;
    case 'bottom':
      y = anchorBottom - elemHeight;
      break;
    case 'left':
      x = anchorLeft;
      break;
    case 'right':
      x = anchorRight - elemWidth;
      break;
    case 'center':
      if (side === 'top' || side === 'bottom') {
        x = anchorLeft + (anchor.offsetWidth - elemWidth) / 2;
      } else {
        y = anchorTop + (anchor.offsetHeight - elemHeight) / 2;
      }
      break;
    default:
  }
  return { left: x, top: y };
};

export default getCoordsByDirection;
