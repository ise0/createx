import { Dispatch, SetStateAction } from 'react';
import { ProductCharacteristic } from '../types';

export const changeCharacteristic = (
  newCharacteristicsValue: { name: string; value: unknown },
  currentProductCharacteristics: ProductCharacteristic,
  productCharacteristics: ProductCharacteristic[],
  setProductCharacteristics: Dispatch<SetStateAction<ProductCharacteristic | undefined>>
) => {
  const newCharacteristicsValues = currentProductCharacteristics.characteristicValues.map(
    (el) => ({
      name: el.characteristicName,
      value:
        el.characteristicName === newCharacteristicsValue.name
          ? newCharacteristicsValue.value
          : JSON.stringify(el.characteristicValue),
    })
  );

  const foundCharacteristics = productCharacteristics.find((el) => {
    let rightCharacteristics = true;
    el.characteristicValues.forEach((el2) => {
      if (
        newCharacteristicsValues.find((el3) => el3.name === el2.characteristicName)?.value !==
        JSON.stringify(el2.characteristicValue)
      ) {
        rightCharacteristics = false;
        return true;
      }
    });
    return rightCharacteristics;
  });

  setProductCharacteristics(foundCharacteristics);
};
