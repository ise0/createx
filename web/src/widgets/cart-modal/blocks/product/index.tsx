import cn from 'classnames';
import { useUpdateCartMutation } from 'features/use-update-cart-mutation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Input } from 'shared/ui/input';
import styles from './styles/product.module.scss';

type CartProduct = {
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
  quantity: number;
};

type Props = {
  className?: string;
  product: CartProduct;
};

export function Product({ className, product }: Props) {
  const { mutate } = useUpdateCartMutation({});
  const {
    discount,
    characteristicValues,
    imagePreview,
    price,
    priceWithDiscount,
    productName,
    quantity: initQuantity,
  } = product;

  const [quantity, setQuantity] = useState(initQuantity);
  useEffect(() => {
    setQuantity(product.quantity);
  }, [product]);

  const productId = {
    productCharacteristicId: product.productCharacteristicId,
    productId: product.productId,
    quantity,
  };

  const mutateQuantity = () => {
    if (productId.quantity <= 0) {
      mutate({
        type: 'removeItem',
        item: {
          productId: productId.productId,
          productCharacteristicId: productId.productCharacteristicId,
        },
      });
    } else {
      mutate({ type: 'addItem', item: productId });
    }
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
          onClick={() =>
            mutate({
              type: 'removeItem',
              item: {
                productId: productId.productId,
                productCharacteristicId: productId.productCharacteristicId,
              },
            })
          }
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
        <Input
          className={styles['product__quantity']}
          size="s"
          type="number"
          value={quantity}
          setValue={setQuantity}
          onEndChange={mutateQuantity}
          onConfirm={mutateQuantity}
          predefinedContent={{ incdec: { setValue: setQuantity } }}
        />
        {discount && <span className={styles['product__sale-price']}>${priceWithDiscount}</span>}
        <span
          className={cn(styles['product__price'], {
            [styles['product__price_old']]: discount,
          })}
        >
          ${price}
        </span>
        <button
          className={styles['product__move-fav-btn']}
          onClick={() =>
            mutate({
              type: 'moveToFav',
              item: {
                productId: productId.productId,
                productCharacteristicId: productId.productCharacteristicId,
              },
            })
          }
        >
          Move to
        </button>
      </div>
    </div>
  );
}
