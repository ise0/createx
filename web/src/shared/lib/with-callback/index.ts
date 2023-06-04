export function getWithCallback(callback: () => void) {
    return <T, U extends unknown[]>(func: (...args: U) => T): ((...args: U) => T) => {
      return (...args) => {
        callback();
        return func(...args);
      };
    };
  }