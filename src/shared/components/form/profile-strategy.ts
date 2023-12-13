import { IFormElements, IFormState } from '.';
import { verifyService } from '../../services/verify-service';
import { FormStrategy } from './base-strategy';

class ProfileStrategy extends FormStrategy {
  constructor(contextState: IFormState, elements: IFormElements) {
    super(contextState, elements);
  }

  protected _addListeners() {
    const { form, inputs } = this._elements;

    form.setProps({ onSubmit: this._onSubmit.bind(this) });

    const inputsArr = Object.values(inputs);

    inputsArr.forEach(inputBlock => {
      inputBlock.setProps({
        onInput(e) {
          const { target } = e;
          if (target instanceof HTMLInputElement) {
            const { value } = target;
            inputBlock.setProps({ value });
          }
        },
        onBlur: this._onBlur.bind(this),
      });
    });
  }

  private _onBlur() {
    verifyService.verify(this._getFormData(), this._showSupport);
  }

  private _getFormData() {
    const { inputs: inputMap } = this._elements;
    const inputBlocks = Object.entries(inputMap);
    const dataEntries: [string, string][] = inputBlocks.map(
      ([name, inputBlock]) => [name, inputBlock.getValue()]
    );

    return Object.fromEntries(dataEntries);
  }

  private _showSupport(verifyResult: Record<string, string>) {
    let isSupport = false;
    const { inputs } = this._elements;
    const resultEntries = Object.entries(verifyResult);
    resultEntries.forEach(([name, support]) => {
      const error = Boolean(support);
      inputs[name]?.setProps({ support, error });
      if (!isSupport && error) {
        isSupport = true;
      }
    });

    return isSupport;
  }

  protected _onSubmit() {}
}

export { ProfileStrategy };
