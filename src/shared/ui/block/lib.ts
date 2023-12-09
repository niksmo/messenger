type TProps = Record<string, unknown>;

export function shallowEqual(
  oldProps: TProps,
  newProps: TProps
): [boolean, Map<string, unknown>] {
  const causeProps = new Map<string, unknown>();
  let isEqual = true;
  for (const key of Object.keys(newProps)) {
    if (!Object.is(oldProps[key], newProps[key])) {
      causeProps.set(key, newProps[key]);
      isEqual = false;
    }
  }

  return [isEqual, causeProps];
}
