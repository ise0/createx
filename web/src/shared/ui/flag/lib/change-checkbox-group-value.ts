export const changeCheckBoxGroupValue =
  <T extends string | number>(itemId: T) =>
  (prevValue: T[]) => {
    const itemIndex = prevValue.indexOf(itemId);
    if (itemIndex >= 0) {
      return [...prevValue.slice(0, itemIndex), ...prevValue.slice(itemIndex + 1)];
    }

    return [itemId, ...prevValue];
  };
