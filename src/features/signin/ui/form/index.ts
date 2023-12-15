import { Block, BlockInput, IBlockProps } from 'shared/components/block';
import templateSpec from './form.template.hbs';

interface ISigninFormProps {
  login: BlockInput;
  password: BlockInput;
  submitButton: Block;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
}

export class SigninForm extends Block {
  constructor(props: ISigninFormProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<ISigninFormProps>) {
    super.setProps(newProps);
  }
}
