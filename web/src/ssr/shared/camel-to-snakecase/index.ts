export const camelToSnakeCaseStr = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const camelToSnakeCase = (arg:  unknown):unknown => {
  if (typeof arg === 'object') {
    if (Array.isArray(arg)) return arg.map(camelToSnakeCase);
    if (arg === null) return arg;
    return Object.fromEntries(
      Object.entries(arg).map(([key, value]) => [camelToSnakeCaseStr(key), camelToSnakeCase(value)])
    );
  }
  return arg;
};
