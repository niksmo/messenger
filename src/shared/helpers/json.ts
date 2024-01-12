export function reviveNullToString(
  _key: string,
  value: unknown
): null | unknown {
  return value === null ? '' : value;
}
