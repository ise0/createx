import cn from 'classnames';

type Mods = {
  [k: string]: { target: string; value: { [k: string]: string } | string };
};

export default function mergeMods(
  styles: { [k: string]: string },
  styleMods: Mods,
  chosenMods: { [k: string]: string | boolean }
) {
  const newStyles = { ...styles };

  Object.entries(chosenMods).forEach((item) => {
    const [chosenModKey, chosenModValue] = item;

    if (!(chosenModKey in styleMods)) return;

    const styleMod = styleMods[chosenModKey];

    let newModClass = '';

    if (typeof styleMod.value === 'object' && typeof chosenModValue === 'string') {
      newModClass = styleMod.value[chosenModValue];
    }
    if (
      typeof styleMod.value === 'string' &&
      typeof chosenModValue === 'boolean' &&
      chosenModValue === true
    ) {
      newModClass = styleMod.value;
    }

    newStyles[styleMod.target] = cn(newStyles[styleMod.target], styles[newModClass]);
  });

  return newStyles;
}
