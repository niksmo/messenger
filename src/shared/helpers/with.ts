export function withInterrupt(fn: (...args: unknown[]) => unknown): () => void {
  const fnInstance = fn;
  return (...args) => {
    setTimeout(fnInstance, 0, ...args);
  };
}
