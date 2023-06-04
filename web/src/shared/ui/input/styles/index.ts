import styles from './scss/input.module.scss';
import mergeMods from 'shared/lib/merge-mods';

export type Mods = { size: 's' | 'm' | 'l'; status?: 'error'; focused?: boolean };

const mods = {
  size: {
    target: 'input',
    value: { s: 'input_size_s', m: 'input_size_m', l: 'input_size_l' },
  },
  status: { target: 'input', value: { error: 'input_status_error' } },
  focused: { target: 'input', value: 'input_focused' },
};

export function getStyles(chosenMods: Mods) {
  return mergeMods(styles, mods, chosenMods);
}
