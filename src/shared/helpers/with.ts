export function withInterrupt(fn: (...args: any[]) => void): () => void {
  const fnInstance = fn;

  return () => {
    setTimeout(() => {
      fnInstance();
    }, 0);
  };
}
