// eslint-disable-next-line @typescript-eslint/ban-types
type TFn = Function;

class EventBus {
  private _listeners: Record<string, TFn[]>;
  constructor() {
    this._listeners = Object.create(null);
  }

  public on(event: string, fn: TFn): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [fn];
      return;
    }

    this._listeners?.[event]?.push(fn);
  }

  public off(event: string, targetCb: TFn): void {
    let curListeners = this._listeners[event];

    if (!curListeners) {
      return;
    }

    if (curListeners.length > 0) {
      curListeners = curListeners.filter((fn) => fn === targetCb);
    }

    this._listeners[event] = curListeners;
  }

  public emit(event: string, ...args: unknown[]): void {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event]?.forEach((fn) => {
      fn(...args);
    });
  }
}

export default EventBus;
