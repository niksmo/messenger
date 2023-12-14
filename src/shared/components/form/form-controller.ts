import { EVENT, TFormElements, getFormData, renderHits } from './lib';
import { EventBus } from '../../packages/event-bus';

type TFormData = Record<string, string>;
type TFormHints = Record<string, string>;

type TFetchState = {
  fetching: boolean;
  success: boolean;
  error: string;
};

type TSetHintsFn = (hints: TFormHints) => void;
type TOnInputBlurCb = (formData: TFormData, setHints: TSetHintsFn) => void;
type TNextFn = () => void;

type TOnStartSubmitCb = (
  formData: TFormData,
  setHints: TSetHintsFn,
  next: TNextFn
) => void;

type TRequestCb = (
  formData: TFormData,
  update: (state: TFetchState) => void
) => void;

interface IFormController {
  onInputBlur(cb: TOnInputBlurCb): void;
  onStartSubmit(cb: TOnStartSubmitCb): void;
  onRequest(cb: (reqState: TFetchState) => void): void;
  request(cb: TRequestCb): void;
}

const initState: TFetchState = {
  fetching: false,
  error: '',
  success: false,
};

class FormController implements IFormController {
  private _requestState: TFetchState;
  private _elements: TFormElements;
  private _eventBus = new EventBus();

  constructor(elements: TFormElements) {
    this._elements = elements;
    this._requestState = { ...initState };
    this._addListeners();
  }

  private _addListeners() {
    const { form, inputMap } = this._elements;

    const onInput = this.onInput.bind(this);
    const onBlur = this.onBlur.bind(this);
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

  private onBlur() {
    const formData = getFormData(this._elements);
    const setHits = this.setHints.bind(this);
    this._eventBus.emit(EVENT.inputBlur, formData, setHits);
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    const formData = getFormData(this._elements);
    const setHits = this.setHints.bind(this);
    const next = this.next.bind(this);
    this._eventBus.emit(EVENT.submitStart, formData, setHits, next);
  }

  private setHints(fieldHints: TFormHints): void {
    const { inputMap } = this._elements;
    renderHits(fieldHints, inputMap);
  }

  private next() {
    const formData = getFormData(this._elements);
    const update = this.update.bind(this);
    this._eventBus.emit(EVENT.request, formData, update);
  }

  private update(state: TFetchState) {
    this._requestState = { ...state };
    this._eventBus.emit(EVENT.fetch, { ...this._requestState });
  }

  onInputBlur(cb: TOnInputBlurCb): void {
    this._eventBus.on(EVENT.inputBlur, cb);
  }

  onStartSubmit(cb: TOnStartSubmitCb): void {
    this._eventBus.on(EVENT.submitStart, cb);
  }

  onRequest(cb: (reqState: TFetchState) => void): void {
    this._eventBus.on(EVENT.fetch, cb);
  }

  request(cb: TRequestCb): void {
    this._eventBus.on(EVENT.request, cb);
  }
}

export { FormController };
