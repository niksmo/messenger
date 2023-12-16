import { Block, BlockInput, IBlockProps } from 'shared/components/block';
import templateSpec from './form.template.hbs';

interface IChangePasswordFormProps {
  current_password: BlockInput;
  new_password: BlockInput;
  confirm: BlockInput;
  submitButton: Block;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
}

export class ChangePasswordForm extends Block {
  constructor(props: IChangePasswordFormProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<IChangePasswordFormProps>) {
    super.setProps(newProps);
  }
}
