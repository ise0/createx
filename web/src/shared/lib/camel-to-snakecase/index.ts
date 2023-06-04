export function snakeToCamelCaseStr(str: string) {
  return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function snakeToCamelCase(arg: unknown): unknown {
  if (typeof arg === 'object') {
    if (Array.isArray(arg)) return arg.map(snakeToCamelCase);
    if (arg === null) return arg;
    return Object.fromEntries(
      Object.entries(arg).map(([key, value]) => [snakeToCamelCaseStr(key), snakeToCamelCase(value)])
    );
  }
  return arg;
}
