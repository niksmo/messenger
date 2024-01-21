import { type InputProps } from 'shared/ui/input/input.block';

export const fieldsParams: Array<
  Pick<InputProps, 'name' | 'placeholder' | 'type'>
> = [
  {
    name: 'current_password',
    placeholder: 'Current password',
    type: 'password',
  },
  {
    name: 'new_password',
    placeholder: 'New password',
    type: 'password',
  },
  {
    name: 'confirm',
    placeholder: 'Confirm password',
    type: 'password',
  },
];
