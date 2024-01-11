import { Block, type IBlockProps } from 'shared/components/block';
import { Input } from 'shared/ui/input';
import { ButtonFilled } from 'shared/ui/button';
import templateSpec from './form.template.hbs';

interface IChangePasswordFormProps extends IBlockProps {
  current_password: Block;
  new_password: Block;
  confirm: Block;
  submitButton: Block;
  onInput: (e: Event) => void;
  onFocusout: (e: Event) => void;
  onSubmit: (e: Event) => void;
}

export class ChangePasswordForm extends Block<IChangePasswordFormProps> {
  constructor() {
    const inputMap = {
      current_password: new Input({
        id: 'current_password',
        name: 'current_password',
        placeholder: 'Current password',
        type: 'password',
        error: false,
        value: '',
      }),
      new_password: new Input({
        id: 'new_password',
        name: 'new_password',
        placeholder: 'New password',
        type: 'password',
        error: false,
        value: '',
      }),
      confirm: new Input({
        id: 'confirm',
        name: 'confirm',
        placeholder: 'Confirm password',
        type: 'password',
        error: false,
        value: '',
      }),
    };

    const submitButton = new ButtonFilled({
      type: 'submit',
      label: 'Change',
      name: 'changeButton',
    });

    super({ ...inputMap, submitButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
