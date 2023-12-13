import {
  IBlock,
  IBlockForm,
  IBlockInput,
  IContext,
  INotifyer,
  IStrategy,
} from '../interfaces';
import { FormStrategy } from './base-strategy';

export type TStatus = 'idle' | 'load' | 'success' | 'error';

export interface IFormElements {
  form: IBlockForm;
  inputs: Record<string, IBlockInput>;
  buttons: Record<string, IBlock>;
}

export interface IFormState {
  status: TStatus;
  error: boolean;
  response: object | null;
}

type TSubscription = (cb: IFormState, formData: Record<string, string>) => void;

interface IFormContext extends IContext<IFormState>, INotifyer {}

class FormContext implements IFormContext {
  private _subscriptions = new Set<TSubscription>();
  private _elements;
  private _state;
  private _strategy;

  constructor(formElements: IFormElements, initState: IFormState) {
    this._elements = formElements;
    this._state = this._proxyState(initState);
    this._strategy = new FormStrategy(this._state, this._elements);
  }

  private _proxyState(state: IFormState) {
    const self = this;
    return new Proxy(state, {
      set(target, p, newValue) {
        const state = target as unknown as Record<string, string>;
        if (
          typeof p === 'symbol' ||
          !state[p] ||
          typeof state[p] !== typeof p
        ) {
          return false;
        }

        state[p] = newValue;
        setTimeout(self._notify.bind(self), 0);
        return true;
      },
    });
  }

  private _getFormData() {
    const { inputs: inputMap } = this._elements;
    const inputBlocks = Object.values<IBlockInput>(inputMap);
    const dataEntries: [string, string][] = inputBlocks.map(inputBlock => [
      inputBlock.getName(),
      inputBlock.getValue(),
    ]);

    return Object.fromEntries(dataEntries);
  }

  private _notify() {
    this._subscriptions.forEach(cb => {
      cb(this._state, this._getFormData());
    });
  }

  public on(cb: TSubscription) {
    this._subscriptions.add(cb);
  }

  public off(cb: TSubscription) {
    this._subscriptions.delete(cb);
  }

  public getState(): IFormState {
    return this._state;
  }
}

export { FormContext };
