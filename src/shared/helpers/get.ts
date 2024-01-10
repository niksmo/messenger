export function getFieldsValues(evt: Event): Record<string, string> {
  const { target } = evt;
  let form: HTMLFormElement | null = null;

  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLButtonElement
  ) {
    form = target.form;
    if (!form) {
      throw Error('Input must have parents form');
    }
  } else if (target instanceof HTMLFormElement) {
    form = target;
  } else {
    throw Error('Unexpected Event target');
  }

  const map = new Map<string, string>();

  for (const el of form) {
    if (el instanceof HTMLInputElement) {
      const { name, value } = el;
      map.set(name, value);
    }
  }

  return Object.fromEntries(map);
}

export function getInputValue(evt: Event): { field: string; value: string } {
  const { target } = evt;

  if (target instanceof HTMLInputElement) {
    const { name: field, value } = target;
    return { field, value };
  }

  throw Error('Unexpected Event target');
}
