import { isObject } from '.';

export function set(
  object: Record<string, unknown> | unknown,
  path: string,
  value: unknown
): Record<string, unknown> {
  if (typeof path !== 'string') {
    throw new Error('"path" must be a string');
  }

  if (path.length < 1) {
    throw new Error('"path" must be a string with length > 0');
  }

  if (!isObject(object)) {
    throw new Error('"object" is primitive');
  }

  let curObj = object;
  const pathList = path.split('.');
  const { length } = pathList;
  let cur = -1;
  const end = length - 1;

  while (true) {
    const p = pathList[++cur];
    if (!p) break;

    if (cur === end) {
      curObj[p] = value;
      break;
    }

    const posObj = curObj[p];

    if (isObject(posObj)) {
      curObj = posObj;
    } else {
      curObj = curObj[p] = {};
    }
  }

  return object;
}
