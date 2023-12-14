export function isSomeValues(o: Record<string, string>) {
  return Object.values(o).some(value => Boolean(value));
}
