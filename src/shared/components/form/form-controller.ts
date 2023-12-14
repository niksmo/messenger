import { EVENT, TFormElements, getFormData, renderHits } from './lib';
import { EventBus } from '../../packages/event-bus';

type TFormData<FieldUnion extends string> = Record<FieldUnion, string>;
type TFormHints<FieldUnion extends string> = Record<FieldUnion, string>;

type TFetchState = {
  fetching: boolean;
  success: boolean;
  error: string;
};

type TSetHintsFn<FieldUnion extends string> = (
  hints: TFormHints<FieldUnion>
) => void;
type TOnInputBlurCb<FieldUnion extends string> = (
  formData: TFormData<FieldUnion>,
  setHints: TSetHintsFn<FieldUnion>
) => void;
type TNextFn = () => void;

type TOnStartSubmitCb<FieldUnion extends string> = (
  formData: TFormData<FieldUnion>,
  setHints: TSetHintsFn<FieldUnion>,
  next: TNextFn
) => void;

type TRequestCb<FieldUnion extends string> = (
  formData: TFormData<FieldUnion>,
  update: (state: TFetchState) => void
) => void;

interface IFormController<FieldUnion extends string> {
  onInputBlur(cb: TOnInputBlurCb<FieldUnion>): void;
  onStartSubmit(cb: TOnStartSubmitCb<FieldUnion>): void;
  onRequest(cb: (reqState: TFetchState) => void): void;
  request(cb: TRequestCb<FieldUnion>): void;
}

const initState: TFetchState = {
  fetching: false,
  error: '',
  success: false,
};

class FormController<FieldUnion extends string>
  implements IFormController<FieldUnion>
{
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

  private setHints(fieldHints: TFormHints<FieldUnion>): void {
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

  onInputBlur(cb: TOnInputBlurCb<FieldUnion>): void {
    this._eventBus.on(EVENT.inputBlur, cb);
  }

  onStartSubmit(cb: TOnStartSubmitCb<FieldUnion>): void {
    this._eventBus.on(EVENT.submitStart, cb);
  }

  onRequest(cb: (reqState: TFetchState) => void): void {
    this._eventBus.on(EVENT.fetch, cb);
  }

  request(cb: TRequestCb<FieldUnion>): void {
    this._eventBus.on(EVENT.request, cb);
  }
}

export { FormController };
