import cn from 'classnames';
import { useUpdateFavoritesMutation } from 'features/use-update-favorites-mutation';
import Image from 'next/image';
import styles from './styles/product.module.scss';

type FavProduct = {
  productId: number;
  productCharacteristicId: number;
  productName: string;
  imagePreview: string;
  characteristicValues: {
    characteristicValueId: number;
    characteristicTypeId: number;
    characteristicName: string;
    characteristicValue: string;
    characteristicView: { text: string };
  }[];
  price: number;
  priceWithDiscount?: number;
  discount?: number;
};

type Props = {
  className?: string;
  product: FavProduct;
};

export function Product({ className, product }: Props) {
  const { mutate } = useUpdateFavoritesMutation({});
  const { discount, characteristicValues, imagePreview, price, productName, priceWithDiscount } =
    product;
  const productId = {
    productCharacteristicId: product.productCharacteristicId,
    productId: product.productId,
  };

  return (
    <div className={cn(className, styles['product'])}>
      <div className={styles['product__image']} style={{ position: 'relative' }}>
        <Image src={imagePreview} alt={productName} fill style={{ objectFit: 'contain' }} />
      </div>
      <div className={styles['product__container']}>
        <span className={styles['product__name']}>{productName}</span>
        <button
          className={styles['product__remove']}
          aria-label="remove from cart"
          onClick={() => mutate({ type: 'removeItem', item: productId })}
        />
        <ul className={styles['product__characteristic-values']}>
          {characteristicValues.map(
            ({ characteristicName, characteristicView, characteristicValueId }) => (
              <div
                className={styles['product__characteristic-values-item']}
                key={characteristicValueId}
              >
                <span className={styles['product__characteristic-values-name']}>
                  {characteristicName}:
                </span>
                <span className={styles['product__characteristic-values-value']}>
                  {characteristicView.text}
                </span>
              </div>
            )
          )}
        </ul>
        {discount && <span className={styles['product__sale-price']}>${priceWithDiscount}</span>}
        <span
          className={cn(styles['product__price'], {
            [styles['product__price_old']]: discount,
          })}
        >
          ${price}
        </span>
        <button
          className={styles['product__move-cart-btn']}
          onClick={() => mutate({ type: 'moveToCart', item: productId })}
        >
          Move to
        </button>
      </div>
    </div>
  );
}
