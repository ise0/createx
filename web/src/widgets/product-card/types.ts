export type ProductCharacteristic = {
  characteristicId: number;
  productVariantId: number;
  characteristicValues: {
    characteristicTypeId: number;
    characteristicName: string;
    characteristicValue: unknown;
    characteristicView: unknown;
  }[];
};

export type Product = {
  requestedVariantId: number;
  productId: number;
  productName: string;
  rating: number;
  prices: {
    characteristicId: number;
    price: number;
    priceWithDiscount?: number;
    discount?: number;
  }[];
  productCharacteristics: ProductCharacteristic[];
  productVariants: {
    productVariantId: number;
    sku: string;
    imagePreview: string;
    images: string[];
  }[];
};

export type ProductCharacteristicView = [
  {
    characteristicName: 'Color';
    characteristicValue: string;
    characteristicView: { text: string; hex: string };
  },
  {
    characteristicName: 'Size';
    characteristicValue: string;
    characteristicView: { text: string; hex: string };
  }
];
