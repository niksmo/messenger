import uuid from 'shared/packages/uuid';
import { Input } from 'shared/ui/input';

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

interface IInputConfig {
  name: string;
  placeholder: string;
  type: string;
}

interface IProps extends Record<string, unknown> {
  name: string;
  placeholder: string;
  type: string;
  id: string;
}

interface IInputState {
  value: string;
  hint: string;
  error: boolean;
}

function createProps(name: string, placeholder: string, type: string): IProps {
  return {
    name,
    placeholder,
    type,
    id: uuid(),
  };
}

export function getInputMap(
  inputsParamsList: IInputConfig[],
  state: Record<string, IInputState>
): Record<string, Input> {
  const map = inputsParamsList.reduce<Record<string, Input>>((map, config) => {
    const { name, placeholder, type } = config;
    const inputState = state[name];

    const props = Object.assign(
      createProps(name, placeholder, type),
      inputState
    );

    map[name] = new Input(props);

    return map;
  }, {});

  return map;
}
