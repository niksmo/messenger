import { type InputProps } from 'shared/ui/input/input.block';

export const fieldsParams: Array<
  Pick<InputProps, 'name' | 'placeholder' | 'type'>
> = [
  {
    name: 'first_name',
    placeholder: 'First name',
    type: 'text',
  },
  {
    name: 'second_name',
    placeholder: 'Last name',
    type: 'text',
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'text',
  },
  {
    name: 'phone',
    placeholder: 'Phone',
    type: 'text',
  },
  {
    name: 'login',
    placeholder: 'Login',
    type: 'text',
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
  {
    name: 'confirm',
    placeholder: 'Confirm password',
    type: 'password',
  },
];
