export function withInterrupt(fn: (...args: unknown[]) => unknown): () => void {
  const fnInstance = fn;
  return (...args) => {
    setTimeout(fnInstance, 0, ...args);
  };
}

export function withDelay(
  fn: (...args: unknown[]) => unknown,
  DELAY: number
): (...args: unknown[]) => unknown {
  let timeoutInstance: NodeJS.Timeout;
  let isTimer = false;

  return (...args) => {
    if (!isTimer) {
      timeoutInstance = setTimeout(() => {
        fn(args);
        isTimer = false;
      }, DELAY);

      isTimer = true;
    } else {
      clearTimeout(timeoutInstance);
      timeoutInstance = setTimeout(fn, DELAY, args);
    }
  };
}
