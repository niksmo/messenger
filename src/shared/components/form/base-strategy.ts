import { IFormElements, IFormState } from '.';
import { IStrategy } from '../interfaces';

class FormStrategy implements IStrategy {
  protected _elements;
  protected _contextState;
  constructor(contextState: IFormState, elements: IFormElements) {
    this._elements = elements;
    this._contextState = contextState;
    this._addListeners();
  }

  protected _addListeners() {}
}

export { FormStrategy };
