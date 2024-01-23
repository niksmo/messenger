import { isObject } from './is';
import { merge } from './merge';

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

  while (cur < end) {
    const p = pathList[++cur];
    if (!p) break;

    const posObj = curObj[p];

    if (cur !== end) {
      if (isObject(posObj)) {
        curObj = posObj;
      } else {
        curObj = curObj[p] = {};
      }
      continue;
    }

    if (isObject(posObj) && isObject(value)) {
      merge(posObj, value);
    } else {
      curObj[p] = value;
    }
  }

  return object;
}
