export function logError(error: unknown) {
  if (process.env.NEXT_PUBLIC_ENV_MODE === 'development') {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
