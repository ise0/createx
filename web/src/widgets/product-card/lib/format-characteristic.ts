import { SupportedCharacteristics } from './supported-characteristics';
import { Product, ProductCharacteristicView } from '../types';

export const formatCharacteristics = (productCharacteristics: Product['productCharacteristics']) => {
  const formattedCharacteristics: {
    sizes: { id: string; text: string }[];
    colors: { id: string; text: string; color: string }[];
  } = { sizes: [], colors: [] };

  productCharacteristics.forEach((el) => {
    el.characteristicValues.forEach((el2) => {
      const characteristic = {
        characteristicName: el2.characteristicName,
        characteristicView: el2.characteristicView,
        characteristicValue: JSON.stringify(el2.characteristicValue),
      } as ProductCharacteristicView[number];

      if (
        el2.characteristicName === SupportedCharacteristics.Color &&
        formattedCharacteristics.colors.find((el3) => el3.id === characteristic.characteristicValue) === undefined
      ) {
        formattedCharacteristics.colors.push({
          id: characteristic.characteristicValue,
          color: characteristic.characteristicView.hex,
          text: characteristic.characteristicView.text,
        });
      } else if (
        el2.characteristicName === SupportedCharacteristics.Size &&
        formattedCharacteristics.sizes.find((el3) => el3.id === characteristic.characteristicValue) === undefined
      ) {
        formattedCharacteristics.sizes.push({ ...characteristic.characteristicView, id: characteristic.characteristicValue });
      }
    });
  });

  return formattedCharacteristics;
};
