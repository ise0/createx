import mergeMods from 'shared/lib/merge-mods';
import { Btn } from 'shared/ui/btn';
import styles from './scss/product.module.scss';

export type Mods = { size: 'm' | 'l' };
type BlockMods = { product__cart: Pick<Parameters<typeof Btn>[0], 'size'> };

const mods = { size: { target: 'product', value: { m: 'product_size_m', l: 'product_size_l' } } };

export function getStyles(chosenMods: Mods) {
  const blockMods: BlockMods = { product__cart: { size: 's' } };
  if (chosenMods.size === 'l') {
    blockMods.product__cart.size = 'm';
  }

  return { blockMods, styles: mergeMods(styles, mods, chosenMods) };
}
