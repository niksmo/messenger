export function isSomeValues(o: Record<string, string>): boolean {
  return Object.values(o).some((value) => Boolean(value));
}
