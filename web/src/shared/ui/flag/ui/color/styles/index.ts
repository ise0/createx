import mergeMods from 'shared/lib/merge-mods';
import styles from './scss/flag.module.scss';

export type Mods = {
  hiddenText?: boolean;
  size?: 'm' | 's';
};

const mods = {
  hiddenText: { target: 'flag', value: 'flag_hidden-text' },
  size: { target: 'flag', value: { s: 'flag_size_s', m: 'flag_size_m' } },
};

export function getStyles({ size = 'm', hiddenText = false }: Mods) {
  return mergeMods(styles, mods, { size, hiddenText });
}
