import cn from 'classnames';
import { useUpdateCartMutation } from 'features/use-update-cart-mutation';
import { useUpdateFavoritesMutation } from 'features/use-update-favorites-mutation';
import { useEffect, useId, useState } from 'react';
import { Btn } from 'shared/ui/btn';
import { flagColorGroupTemplate, flagSquareGroupTemplate } from 'shared/ui/flag';
import { Rating } from 'shared/ui/rating';
import { Slideshow } from 'shared/ui/slideshow';
import { changeCharacteristic } from './lib/change-characteristic';
import { formatCharacteristics } from './lib/format-characteristic';
import { SupportedCharacteristics } from './lib/supported-characteristics';
import { getStyles, Mods } from './styles';
import { Product } from './types';

type Props = {
  className?: string;
  product: Product;
} & Mods;

export type { Product };

export function ProductCard({ product: productProp, className, size }: Props) {
  const { mutate: updateCart } = useUpdateCartMutation({});
  const { mutate: updateFavorites } = useUpdateFavoritesMutation({});
  const [product, setProduct] = useState(productProp);
  const [productCharacteristic, setProductCharacteristic] = useState(
    product.productCharacteristics.find((el) => el.productVariantId === product.requestedVariantId)
  );
  if (!productCharacteristic) throw new Error('');

  const productVariant = product.productVariants.find(
    (el) => el.productVariantId === productCharacteristic.productVariantId
  );
  if (!productVariant) throw new Error('');
  const id = useId();

  product.productCharacteristics.forEach((el) =>
    el['characteristicValues'].forEach((el2) => {
      if (!(el2.characteristicName in SupportedCharacteristics)) throw new Error('');
    })
  );
  useEffect(() => {
    setProduct(product);
    setProductCharacteristic(
      product.productCharacteristics.find(
        (el) => el.productVariantId === product.requestedVariantId
      )
    );
  }, [product]);

  const formattedCharacteristics = formatCharacteristics(product.productCharacteristics);

  const { styles, blockMods } = getStyles({ size });

  const price = product.prices.find(
    (el) => el.characteristicId === productCharacteristic.characteristicId
  );
  if (price === undefined) return null;
  return (
    <div className={cn(styles['product'], className)}>
      <div className={styles['product__img']}>
        <Slideshow
          className={styles['product__slideshow']}
          previewImage={{ link: productVariant.imagePreview, alt: product.productName }}
          images={productVariant.images.map((link) => ({ link, alt: product.productName }))}
        />
        {price.discount && (
          <span className={styles['product__sale-badge']}>-{price.discount}%</span>
        )}
        <Rating className={styles['product__rating']} rate={5 * (product.rating / 100)} outOf={5} />
        <button
          className={styles['product__favorite']}
          onClick={() =>
            updateFavorites({
              type: 'addItem',
              item: {
                productId: product.productId,
                productCharacteristicId: productCharacteristic.characteristicId,
              },
            })
          }
        >
          save as favorite
        </button>
      </div>

      <div className={styles['product__container-1']}>
        <a className={styles['product__name']} href="/">
          {product.productName}
        </a>

        {price.discount && (
          <span className={styles['product__sale-price']}>${price.priceWithDiscount}</span>
        )}
        <span
          className={cn(styles['product__price'], {
            [styles['product__price_old']]: price.discount,
          })}
        >
          ${price.price}
        </span>

        <div className={styles['product__container-2']}>
          <div className={styles['product__container-3']}>
            {formattedCharacteristics.sizes.length > 0 && (
              <ul className={styles['product__sizes']}>
                {flagSquareGroupTemplate({
                  type: 'radio',
                  name: `${id}-sizes`,
                  onChange: (value) =>
                    changeCharacteristic(
                      { name: SupportedCharacteristics.Size, value },
                      productCharacteristic,
                      product.productCharacteristics,
                      setProductCharacteristic
                    ),
                  options: formattedCharacteristics.sizes,
                  value: JSON.stringify(
                    productCharacteristic.characteristicValues.find(
                      (el) => el.characteristicName === SupportedCharacteristics.Size
                    )?.characteristicValue
                  ),
                }).map((el, i) => (
                  <li className={styles['product__sizes-item']} key={i}>
                    {el}
                  </li>
                ))}
              </ul>
            )}
            {formattedCharacteristics.colors.length > 0 && (
              <ul className={styles['product__colors']}>
                {flagColorGroupTemplate({
                  size: 's',
                  hiddenText: true,
                  type: 'radio',
                  name: `${id}-colors`,
                  onChange: (value) =>
                    changeCharacteristic(
                      { name: SupportedCharacteristics.Color, value },
                      productCharacteristic,
                      product.productCharacteristics,
                      setProductCharacteristic
                    ),
                  options: formattedCharacteristics.colors,
                  value: JSON.stringify(
                    productCharacteristic.characteristicValues.find(
                      (el) => el.characteristicName === SupportedCharacteristics.Color
                    )?.characteristicValue
                  ),
                }).map((el, i) => (
                  <li className={styles['product__colors-item']} key={i}>
                    {el}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Btn
            className={styles['product__cart-btn']}
            type="button"
            text="Add to cart"
            theme="solid"
            icon={{ link: '/images/cart.svg', svgFillColor: '#fff', size: 'contain' }}
            onClick={() =>
              updateCart({
                type: 'addItem',
                item: {
                  productId: product.productId,
                  productCharacteristicId: productCharacteristic.characteristicId,
                  quantity: 1,
                },
              })
            }
            {...blockMods.product__cart}
          />
        </div>
      </div>
    </div>
  );
}
