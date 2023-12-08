type TProps = Record<string, unknown>;

export function shallowEqual(oldProps: TProps, newProps: TProps) {
  for (const key of Object.keys(newProps)) {
    if (!oldProps[key] || !Object.is(oldProps[key], newProps[key])) {
      return false;
    }
  }

  return true;
}
