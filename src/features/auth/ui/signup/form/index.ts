import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputMap, getInputValue } from 'shared/helpers';
import { type ISignupState } from '../../../model';
import { signupController } from '../../../controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class SignupForm extends Block {
  private readonly _onStoreUpdate;

  constructor() {
    signupController.start();

    const state = store.getState<ISignupState>();
    const { load, ...fields } = state.signup;

    const inputMap = getInputMap(fieldsParams, fields);

    const submitButton = new ButtonFilled({
      label: 'Sign up',
      type: 'submit',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        signupController.input(getInputValue(e));
      },
      onFocusout: (e: Event) => {
        signupController.verify(getFieldsValues(e));
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        void signupController.submit(getFieldsValues(e));
      },
    });

    this._onStoreUpdate = (state: ISignupState) => {
      const { load, ...fields } = state.signup;
      Object.entries(fields).forEach(([field, props]) => {
        const block = inputMap[field];
        if (block) {
          block.setProps({ ...props });
        }
      });

      submitButton.setProps({ disabled: load });
    };

    store.on<ISignupState>(this._onStoreUpdate);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
