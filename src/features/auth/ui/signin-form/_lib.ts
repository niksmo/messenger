import { type InputProps } from 'shared/ui/input';

export const fieldsParams: Array<
  Pick<InputProps, 'name' | 'placeholder' | 'type'>
> = [
  {
    name: 'login',
    placeholder: 'Login',
    type: 'text',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
];
