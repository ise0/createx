import mergeMods from 'shared/lib/merge-mods';
import styles from './scss/btn.module.scss';

export type Mods = {
  size: 's' | 'm' | 'l';
  theme: 'solid' | 'outline';
  pressed: boolean;
};

const mods = {
  size: {
    target: 'btn',
    value: {
      s: 'btn_size_s',
      m: 'btn_size_m',
      l: 'btn_size_l',
    },
  },
  theme: {
    target: 'btn',
    value: {
      solid: 'btn_theme_solid',
      outline: 'btn_theme_outline',
    },
  },
  pressed: { target: 'btn', value: 'btn_pressed' },
};

export function getStyles(chosenMods: Mods) {
  return mergeMods(styles, mods, chosenMods);
}
