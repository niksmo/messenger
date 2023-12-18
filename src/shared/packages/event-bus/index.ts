class EventBus {
  private _listeners: Record<string, Function[]>;
  constructor() {
    this._listeners = Object.create(null);
  }

  public on(event: string, cb: Function) {
    if (!this._listeners[event]) {
      this._listeners[event] = [cb];
      return;
    }

    this._listeners?.[event]?.push(cb);
  }

  public off(event: string, targetCb: Function) {
    let curListeners = this._listeners[event];

    if (!curListeners) {
      return;
    }

    if (curListeners.length > 0) {
      curListeners = curListeners.filter((cb) => cb === targetCb);
    }

    if (curListeners.length === 0) {
      delete this._listeners[event];
    } else {
      this._listeners[event] = curListeners;
    }
  }

  public emit(event: string, ...args: unknown[]) {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event]?.forEach((cb) => {
      cb(...args);
    });
  }
}

abstract class EventsMember<T> {
  protected eventMap = new Map<T, Function>();

  public addEventCb(eventType: T, cb: Function) {
    this.eventMap.set(eventType, cb);
  }
}

export { EventBus, EventsMember };
