import cn from 'classnames';
import { ProductCard, type Product } from 'widgets/product-card';
import styles from './styles/catalog.module.scss';

type TCatalogProps = { className?: string; products: Product[] };

export function Catalog({ className, products }: TCatalogProps) {
  return (
    <ul className={cn(styles['catalog'], className)}>
      {products.map((el,i) => {
        return (
          <li className={styles['catalog__item']} key={`${i} ${el.productId} ${el.requestedVariantId}`}>
            <ProductCard product={el} size="m" />
          </li>
        );
      })}
    </ul>
  );
}
