type CharacteristicValue = {
  characteristicValueId: number;
  characteristicTypeId: number;
  characteristicName: string;
  characteristicValue: string;
  characteristicView: { text: string };
};

export type FavProducts = {
  productId: number;
  productCharacteristicId: number;
  productName: string;
  imagePreview: string;
  characteristicValues: CharacteristicValue[];
  price: number;
  priceWithDiscount?: number;
  discount?: number;
}[];
