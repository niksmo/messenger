import { classof } from './classof';

export function isSomeValues(o: Record<string, string>): boolean {
  return Object.values(o).some((value) => Boolean(value));
}

export function isObject(posObj: unknown): posObj is object {
  return (
    typeof posObj === 'object' &&
    posObj !== null &&
    classof(posObj) === 'Object'
  );
}
