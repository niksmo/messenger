import {
  EVENT,
  TCallBack,
  TCallBackMap,
  TFormElements,
  TRequestState,
  getFormData,
  isSupport,
  renderSupport,
} from './lib';

interface IFormController {
  on(event: EVENT, cb: TCallBack): this;
  off(event: EVENT, cb: TCallBack): this;
}

const initState: TRequestState = {
  fetching: false,
  error: '',
  success: false,
};

class FormController implements IFormController {
  protected _requestState: TRequestState;
  protected _elements: TFormElements;
  protected _subscriptions: TCallBackMap = {
    inputBlur: [],
    submitStart: [],
    request: [],
  };

  constructor(elements: TFormElements) {
    this._elements = elements;
    this._requestState = this._proxyState({ ...initState });
    this._addListeners();
  }

  private _proxyState(state: TRequestState) {
    const self = this;

    return new Proxy(state, {
      set(target, p, newValue) {
        const state = target as Record<string, unknown>;
        if (
          typeof p !== 'symbol' &&
          p in state &&
          typeof state[p] === typeof newValue
        ) {
          state[p] = newValue;

          const {
            _elements,
            _subscriptions: { request },
          } = self;

          request.forEach(subscription => subscription(state, _elements));
        }
        return true;
      },
    });
  }

  private _addListeners() {
    const { form, inputMap } = this._elements;

    const onInput = this.onInput.bind(this);
    const onBlur = this.onInputBlur.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    Object.values(inputMap).forEach(inputBlock => {
      inputBlock.setProps({
        onInput,
        onBlur,
      });
    });

    form.setProps({
      onSubmit,
    });
  }

  private onInput(e: Event) {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const { name, value } = target;
      this._elements.inputMap[name]?.setProps({ value });
    }
  }

  private onInputBlur() {
    const subscriptions = this._subscriptions[EVENT.inputBlur];
    subscriptions.forEach(subscription => {
      const res = subscription(getFormData(this._elements), this._elements);
      if (isSupport(res)) {
        renderSupport(res, this._elements.inputMap);
      }
    });
  }

  private onSubmit(e: Event) {
    e.preventDefault();

    const subscriptions = this._subscriptions[EVENT.submitStart];
    subscriptions.forEach(subscription => {
      const res = subscription(getFormData(this._elements), this._elements);
      if (res === false) {
        return;
      }

      if (isSupport(res)) {
        if (Object.values(res).some(value => Boolean(value))) {
          renderSupport(res, this._elements.inputMap);
          return;
        }
      }

      this.request();
    });
  }

  on(event: EVENT, cb: TCallBack): this {
    this._subscriptions[event].push(cb);

    return this;
  }

  off(event: EVENT, cb: TCallBack): this {
    this._subscriptions[event] = this._subscriptions[event].filter(
      storedCb => storedCb === cb
    );

    return this;
  }

  protected request() {}
}

export { FormController };
