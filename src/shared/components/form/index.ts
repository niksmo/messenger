import { EventsMember } from '../../packages/event-bus';

type TFormEvents =
  | 'onInput'
  | 'onBlur'
  | 'onSubmit'
  | 'onCheckResult'
  | 'onRequest'
  | 'onResponse';

class Form extends EventsMember<TFormEvents> {
  values: Record<string, string> = {};
  errors: Record<string, string> = {};

  protected onInput(e: Event) {
    const callbackFn = this.eventMap.get('onInput');
    if (!callbackFn) {
      return;
    }

    if (e.target instanceof HTMLFormElement) {
      const inputElements = Array.from(e.target.elements);
      inputElements.forEach(el => {
        if (el instanceof HTMLInputElement) {
          this.values[el.name] = el.value;
        }
      });
    }
  }

  protected onSubmit() {
    const callbackFn = this.eventMap.get('onSubmit');
    if (!callbackFn) {
      return;
    }

    callbackFn(this.values);
  }

  protected onBlur() {
    const callbackFn = this.eventMap.get('onBlur');
    if (!callbackFn) {
      return;
    }

    callbackFn(this.values);
  }

  protected onCheckResult(arg: unknown) {
    const callbackFn = this.eventMap.get('onCheckResult');
    if (!callbackFn) {
      return;
    }

    callbackFn(arg);
  }

  protected onRequest(arg: unknown) {
    const callbackFn = this.eventMap.get('onRequest');
    if (!callbackFn) {
      return;
    }

    callbackFn(arg);
  }

  protected onResponse(arg: unknown) {
    const callbackFn = this.eventMap.get('onResponse');
    if (!callbackFn) {
      return;
    }

    callbackFn(arg);
  }
}

export { Form };
