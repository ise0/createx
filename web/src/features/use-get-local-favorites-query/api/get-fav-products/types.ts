import { ApiErrorCode, GraphqlError } from 'shared/api';

type CharacteristicValueResponse = {
  characteristic_value_id: number;
  characteristic_type_id: number;
  characteristic_name: string;
  characteristic_value: string;
  characteristic_view: string;
};

type FavoritesProductResponse = {
  product_id: number;
  product_characteristic_id: number;
  product_name: string;
  image_preview: string;
  characteristic_values: CharacteristicValueResponse[];
  price: number;
  price_with_discount?: number;
  discount?: number;
};

export type ServerResponse =
  | {
      data: { favoritesProducts: FavoritesProductResponse[] };
      errors: undefined;
    }
  | { data: undefined; errors: [GraphqlError<ApiErrorCode.internalServerError, undefined>] };

type CharacteristicValue = {
  characteristicValueId: number;
  characteristicTypeId: number;
  characteristicName: string;
  characteristicValue: string;
  characteristicView: { text: string };
};

export type FavProduct = {
  productId: number;
  productCharacteristicId: number;
  productName: string;
  imagePreview: string;
  characteristicValues: CharacteristicValue[];
  price: number;
  priceWithDiscount?: number;
  discount?: number;
};
