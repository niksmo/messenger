import { classof } from './classof.ts';

export function isSomeValues(o: Record<string, string>): boolean {
  return Object.values(o).some((value) => Boolean(value));
}

type Indexed = object & { [key in string]: unknown };

export function isObject(posObj: unknown): posObj is Indexed {
  return (
    typeof posObj === 'object' &&
    posObj !== null &&
    classof(posObj) === 'Object'
  );
}
