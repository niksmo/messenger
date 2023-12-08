interface callBackFn<T = any> {
  (...args: T[]): void;
}

class EventBus {
  private _listeners: Record<string, callBackFn[]>;
  constructor() {
    this._listeners = Object.create(null);
  }

  public on<T>(event: string, cb: callBackFn<T>) {
    if (!this._listeners[event]) {
      this._listeners[event] = [cb];
      return;
    }

    this._listeners?.[event]?.push(cb);
  }

  public off<T>(event: string, targetCb: callBackFn<T>) {
    let curListeners = this._listeners[event];

    if (!curListeners) {
      return;
    }

    if (curListeners.length > 0) {
      curListeners = curListeners.filter(cb => cb === targetCb);
    }

    if (curListeners.length === 0) {
      delete this._listeners[event];
    } else {
      this._listeners[event] = curListeners;
    }
  }

  public emit<T>(event: string, ...args: T[]) {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event]?.forEach(cb => {
      cb(...args);
    });
  }
}

export { EventBus };
