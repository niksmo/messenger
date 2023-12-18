import { EventBus } from 'shared/packages/event-bus';
import {
  EVENT,
  type IFormController,
  type TFetchState,
  type TFormElements,
  type TFormHints,
  type TOnInputBlurCb,
  type TOnStartSubmitCb,
  type TRequestCb,
  getFormData,
  renderHits,
} from './lib';

const initState: TFetchState = {
  fetching: false,
  error: '',
  success: false,
};

class FormController<FieldUnion extends string>
  implements IFormController<FieldUnion>
{
  private _requestState: TFetchState;
  private readonly _elements: TFormElements;
  private readonly _eventBus = new EventBus();

  constructor(elements: TFormElements) {
    this._elements = elements;
    this._requestState = { ...initState };
    this._addListeners();
  }

  private _addListeners(): void {
    const { form, inputMap } = this._elements;

    const onInput = this.onInput.bind(this);
    const onBlur = this.onBlur.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    Object.values(inputMap).forEach((inputBlock) => {
      inputBlock.setProps({
        onInput,
        onBlur,
      });
    });

    form.setProps({
      onSubmit,
    });
  }

  private onInput(e: Event): void {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const { name, value } = target;
      this._elements.inputMap[name]?.setProps({ value });
    }
  }

  private onBlur(): void {
    const formData = getFormData(this._elements);
    const setHints = this.setHints.bind(this);
    this._eventBus.emit(EVENT.inputBlur, formData, setHints);
  }

  private onSubmit(e: Event): void {
    e.preventDefault();
    const formData = getFormData(this._elements);
    const setHints = this.setHints.bind(this);
    const next = this.next.bind(this);
    this._eventBus.emit(EVENT.submitStart, next, formData, setHints);
  }

  private setHints(fieldHints: TFormHints<FieldUnion>): void {
    const { inputMap } = this._elements;
    renderHits(fieldHints, inputMap);
  }

  private next(): void {
    const formData = getFormData(this._elements);
    const update = this.update.bind(this);
    const setHints = this.setHints.bind(this);
    this._eventBus.emit(EVENT.request, formData, update, setHints);
  }

  private update(state: TFetchState): void {
    this._requestState = { ...state };
    this._eventBus.emit(EVENT.fetch, { ...this._requestState });
  }

  onInputBlur(cb: TOnInputBlurCb<FieldUnion>): this {
    this._eventBus.on(EVENT.inputBlur, cb as (...args: unknown[]) => void);
    return this;
  }

  onStartSubmit(cb: TOnStartSubmitCb<FieldUnion>): this {
    this._eventBus.on(EVENT.submitStart, cb);
    return this;
  }

  onRequest(cb: (reqState: TFetchState) => void): this {
    this._eventBus.on(EVENT.fetch, cb);
    return this;
  }

  request(cb: TRequestCb<FieldUnion>): this {
    this._eventBus.on(EVENT.request, cb);
    return this;
  }
}

export { FormController };
