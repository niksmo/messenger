import { isObject } from './is';

type Indexed = Record<string, unknown>;

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const key of Object.keys(lhs)) {
    if (key in rhs) {
      const left = lhs[key];
      const right = rhs[key];
      if (isObject(left) && isObject(right)) {
        merge(left, right);
      } else {
        lhs[key] = rhs[key];
      }
    }
  }

  for (const key of Object.keys(rhs)) {
    if (!(key in lhs)) {
      lhs[key] = rhs[key];
    }
  }

  return lhs;
}
