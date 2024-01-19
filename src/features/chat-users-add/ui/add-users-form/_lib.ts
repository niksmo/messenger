import { type InputProps } from 'shared/ui/input';

export const fieldsParams: Array<
  Pick<InputProps, 'name' | 'placeholder' | 'type'>
> = [{ name: 'login', placeholder: 'User login', type: 'text' }];
