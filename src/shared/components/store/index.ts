import { set } from 'shared/helpers';
import EventBus from 'shared/packages/event-bus';
import { type IStore } from '../interfaces';

type Indexed = Record<string, unknown>;

export class Store implements IStore {
  private static _instance: null | Store = null;
  private _state: Indexed = {};
  private readonly _eventBus: EventBus;
  private readonly _updateEvent = 'update';

  constructor() {
    this._eventBus = new EventBus();

    if (Store._instance !== null) {
      return Store._instance;
    }

    Store._instance = this;
  }

  public static instance(): Store {
    if (Store._instance == null) {
      Store._instance = new Store();
    }
    return Store._instance;
  }

  init(state: Indexed = {}): this {
    this._state = state;
    return this;
  }

  on<State = Indexed>(fn: (state: State) => void): this {
    this._eventBus.on(this._updateEvent, fn);

    return this;
  }

  off<State = Indexed>(fn: (state: State) => void): void {
    this._eventBus.off(this._updateEvent, fn);
  }

  set(path: string, value: unknown): this {
    set(this._state, path, value);

    this._eventBus.emit(this._updateEvent, this._state);

    return this;
  }

  getState<State = Indexed>(): State {
    return this._state as State;
  }
}
