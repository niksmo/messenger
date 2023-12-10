import { ResponseMessage, SigninForm } from '..';
import { EventBus } from '../../../shared/packages/event-bus';

interface IVerifier {
  validate: (
    formValues: Record<string, string>
  ) => Record<string, string> | null;
}

const enum Event {
  BLUR = 'blur',
  SUBMIT = 'submit',
  SHOW_SUPPORT = 'showSupport',
  REQUEST = 'request',
  LOAD = 'load',
  RESPONSE = 'response',
}

class Verifier implements IVerifier {
  validate(formValues: Record<string, string>): Record<string, string> | null {
    void formValues;
    // return null;

    return { login: 'asfasdf', password: 'adsfasdfasf' };
  }
}

class API {
  request() {
    console.log('request');
  }
}

export class SigninFormDirector {
  private _eventBus: EventBus;
  private _form: SigninForm;
  private _message: ResponseMessage;
  private _verifier: Verifier;
  private _api: API;
  constructor(form: SigninForm, responseMessage: ResponseMessage) {
    this._eventBus = new EventBus();
    this._verifier = new Verifier();
    this._api = new API();
    this._form = form;
    this._message = responseMessage;
  }

  private subscribe() {
    this._eventBus.on(Event.SUBMIT, this.validate.bind(this));
    this._eventBus.on(Event.SHOW_SUPPORT, this.showSupport.bind(this));
    this._eventBus.on(Event.REQUEST, this.requestUserData.bind(this));
  }

  private validate(arg: unknown) {
    if (typeof arg === 'object') {
      const formValues = arg as Record<string, string>;

      const validityResult = this._verifier?.validate(formValues);

      if (validityResult === null) {
        this._eventBus.emit(Event.REQUEST, formValues);
      } else {
        this._form.showErrors(validityResult);
      }
    }
  }

  private showSupport(arg: unknown) {
    if (typeof arg === 'object') {
      const validityResult = arg as Record<string, string>;
      this._form.showErrors(validityResult);
    }
  }

  private requestUserData(arg: unknown) {
    if (typeof arg === 'object') {
      this._api.request();
    }
  }

  private onSubmit(formValues: any) {
    this._eventBus.emit(Event.SUBMIT, formValues);
  }

  private onBlur(formValues: any) {
    this._eventBus.emit(Event.SUBMIT, formValues);
  }

  private addListeners() {
    this._form.addListener('submit', this.onSubmit.bind(this));
    this._form.addListener('blur', this.onBlur.bind(this));
  }

  public init(): void {
    this.addListeners();
    this.subscribe();
  }
}
