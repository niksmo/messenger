import { type InputProps } from 'shared/ui/input';

export const fieldsParams: Array<
  Pick<InputProps, 'name' | 'placeholder' | 'type'>
> = [{ name: 'title', placeholder: 'Title', type: 'text' }];
