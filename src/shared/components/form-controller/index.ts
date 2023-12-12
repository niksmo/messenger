import { EventsMember } from '../../packages/event-bus';
import { IBlockInput, IFormController } from '../interfaces';

const enum FORM_EVENT {
  onInput = 'onInput',
  onBlur = 'onBlur',
  onSubmit = 'onSubmit',
  onCheckResult = 'onCheckResult',
  onRequest = 'onRequest',
  onResponse = 'onResponse',
}

const enum FORM_ELEMENT {
  text = 'text',
  password = 'password',
  submit = 'submit',
  search = 'search',
  checkbox = 'checkbox',
  radio = 'radio',
  file = 'file',
  range = 'range',
}

class FormController
  extends EventsMember<FORM_EVENT>
  implements IFormController
{
  private elements: Record<string, IBlockInput> = {};
  private values: Record<string, string> = {};
  private errors: Record<string, string> = {};

  public addElement(block: IBlockInput) {
    const type = block.getType();
    const name = block.getName();

    this.elements[name] = block;

    this.errors[name] = '';

    if (type !== FORM_ELEMENT.submit) {
      this.values[name] = block.getValue();
    }
  }

  protected onInput(e: Event) {
    const callbackFn = this.eventMap.get(FORM_EVENT.onInput);
    if (!callbackFn) {
      return;
    }

    const { target } = e;

    if (target instanceof HTMLInputElement) {
      const { value, name } = target;
      this.elements[name]?.setProps({ value });
    }
  }

  protected onSubmit() {
    const callbackFn = this.eventMap.get(FORM_EVENT.onSubmit);
    if (!callbackFn) {
      return;
    }

    callbackFn(this.values);
  }

  protected onBlur() {
    const callbackFn = this.eventMap.get(FORM_EVENT.onBlur);
    if (!callbackFn) {
      return;
    }

    callbackFn(this.values);
  }

  protected onCheckResult(arg: unknown) {
    const callbackFn = this.eventMap.get(FORM_EVENT.onCheckResult);
    if (!callbackFn) {
      return;
    }

    if (typeof arg === 'object' && arg !== null) {
      const checkResult = arg as Record<string, string>;
      this.errors = checkResult;
    }

    callbackFn(this.errors);
  }

  protected onRequest(arg: unknown) {
    const callbackFn = this.eventMap.get(FORM_EVENT.onRequest);
    if (!callbackFn) {
      return;
    }

    callbackFn(arg);
  }

  protected onResponse(arg: unknown) {
    const callbackFn = this.eventMap.get(FORM_EVENT.onResponse);
    if (!callbackFn) {
      return;
    }

    callbackFn(arg);
  }
}

export { FormController, FORM_EVENT, FORM_ELEMENT };
