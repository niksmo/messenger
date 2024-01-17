import uuid from 'shared/packages/uuid/uuid';
import { Input, type InputProps } from 'shared/ui/input';

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

interface IProps {
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

export function getInputMap<TFieldNames extends string>(
  inputsParamsList: IInputConfig[],
  state: Record<string, IInputState>
): Record<TFieldNames, Input> {
  const map = inputsParamsList.reduce<
    Record<IInputConfig[][number]['name'], Input>
  >((map, config) => {
    const { name, placeholder, type } = config;
    const inputState = state[name];

    const props = Object.assign(
      createProps(name, placeholder, type),
      inputState
    );

    map[name] = new Input(props as InputProps);

    return map;
  }, {});

  return map;
}

export function getTypedEntries<TParamsUnion extends string, TValue>(
  obj: Record<TParamsUnion, TValue>
): Array<[TParamsUnion, TValue]> {
  const entries = Object.entries(obj) as Array<[TParamsUnion, TValue]>;
  return entries;
}
