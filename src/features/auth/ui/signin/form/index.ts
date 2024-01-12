import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputMap, getInputValue } from 'shared/helpers';
import { type ISigninState } from '../../../model';
import { signinController } from '../../../controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class SigninForm extends Block {
  private readonly _onStoreUpdate;

  constructor() {
    signinController.start();

    const state = store.getState<ISigninState>();
    const { error, load, ...inputs } = state.signin;

    const inputMap = getInputMap(fieldsParams, inputs);

    const submitButton = new ButtonFilled({
      label: 'Sign in',
      type: 'submit',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        signinController.input(getInputValue(e));
      },
      onFocusout: (e: Event) => {
        signinController.verify(getFieldsValues(e));
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        void signinController.submit(getFieldsValues(e));
      },
    });

    this._onStoreUpdate = (state: ISigninState) => {
      const { load, error, ...fields } = state.signin;

      Object.entries(fields).forEach(([field, props]) => {
        const block = inputMap[field];
        if (block) {
          block.setProps({ ...props });
        }
      });

      submitButton.setProps({ disabled: load });
    };

    store.on<ISigninState>(this._onStoreUpdate);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
