import uuid from 'shared/packages/uuid/uuid';
import { Input, type InputProps } from 'shared/ui/input/input.block';

export function makeFields(
  fieldsParams: Array<Omit<InputProps, 'id'>>
): Record<string, Input> {
  const initState = {
    value: '',
    hint: '',
    error: false,
  };

  const indexedBlocks: Record<string, Input> = {};
  fieldsParams.reduce((indexed, params) => {
    const { name } = params;
    indexed[name] = new Input({ id: uuid(), ...initState, ...params });
    return indexed;
  }, indexedBlocks);

  return indexedBlocks;
}
