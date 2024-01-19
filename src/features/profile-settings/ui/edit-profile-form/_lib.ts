import { type InputProps } from 'shared/ui/input';

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
    name: 'display_name',
    placeholder: 'Username',
    type: 'text',
  },
];
