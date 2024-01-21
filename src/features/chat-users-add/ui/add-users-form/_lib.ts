import { type InputProps } from 'shared/ui/input/input.block';

export const fieldsParams: Array<
  Pick<InputProps, 'name' | 'placeholder' | 'type'>
> = [{ name: 'login', placeholder: 'User login', type: 'text' }];
