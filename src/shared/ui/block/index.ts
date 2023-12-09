import { template as templator } from 'handlebars/runtime';
import { EventBus } from '../../packages/event-bus';
import { uuid } from '../../packages/uuid';
import { shallowEqual } from './lib';

interface IBlockProps {
  [key: string]: unknown;
}

const enum EVENT {
  INIT = 'init',
  MOUNT = 'componentDidMount',
  UPDATE = 'componentDidUpdate',
  RENDER = 'render',
}

const TMP_TAG = 'tmp';

abstract class Block {
  private _props: IBlockProps;
  private _styles: CSSModuleClasses;
  private _id = uuid();
  private _eventBus = new EventBus();
  private _templator = templator;
  private _shallowEqual = shallowEqual;
  private _element: Node | null = null;
  private _childBlocks = new Map<string, Block>();
  private _events: Record<string, EventListener> = {};
  private _updatingPropsNum = 0;

  constructor(props: IBlockProps = {}, styles: CSSModuleClasses = {}) {
    this._props = this._proxyProps(props);
    this._styles = styles;
    this._subscribe();
    this._eventBus.emit(EVENT.INIT, props);
  }

  [Symbol.toPrimitive](a: 'string' | 'default' | 'number') {
    if (a === 'string' || a === 'default') {
      return `<${TMP_TAG} data-id=${this._id}></${TMP_TAG}>`;
    }
  }

  protected abstract _getTemplateSpec(): TemplateSpecification;

  private _proxyProps(props: IBlockProps) {
    const self = this;
    let propsCounter = 0;
    let oldProps: IBlockProps = {};
    let newProps: IBlockProps = {};

    return new Proxy(props, {
      set(props, p, newValue) {
        if (typeof p === 'symbol') {
          return false;
        }

        if (propsCounter === 0) {
          oldProps = { ...props };
        }

        newProps[p] = props[p] = newValue;
        propsCounter += 1;

        if (propsCounter === self._updatingPropsNum) {
          self._eventBus.emit(EVENT.UPDATE, oldProps, newProps);
          propsCounter = 0;
        }

        return true;
      },
    });
  }

  private _subscribe() {
    this._eventBus.on(EVENT.INIT, this._init.bind(this));
    this._eventBus.on(EVENT.MOUNT, this._didMount.bind(this));
    this._eventBus.on(EVENT.UPDATE, this._didUpdate.bind(this));
    this._eventBus.on(EVENT.RENDER, this._render.bind(this));
  }

  private _init() {
    this._parseProps();
    this._eventBus.emit(EVENT.RENDER);
  }

  private _parseProps() {
    for (const key of Object.keys(this._props)) {
      const value = this._props[key];

      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item instanceof Block) {
            this._childBlocks.set(item._id, item);
          }
        });
        continue;
      }

      if (value instanceof Block) {
        this._childBlocks.set(value._id, value);
        continue;
      }

      if (typeof value === 'function') {
        this._events[key] = value as EventListener;
      }
    }
  }

  private _addListeners(block: HTMLElement) {
    Object.entries(this._events).forEach(([event, cb]) => {
      block.addEventListener(event, cb);
    });
  }

  private _render() {
    const compileTemplate = this._templator(this._getTemplateSpec());
    const htmlCode = compileTemplate({ ...this._props, styles: this._styles });
    const tmpElement = document.createElement('template');
    tmpElement.innerHTML = htmlCode;

    const block = tmpElement.content.firstChild;

    if (block instanceof HTMLElement) {
      const stubs = Array.from(block.getElementsByTagName(TMP_TAG));
      stubs.forEach(stub => {
        if (stub instanceof HTMLUnknownElement && stub.dataset.id) {
          const childBlock = this._childBlocks.get(stub.dataset.id);

          const node = childBlock?.getContent();

          if (node) {
            stub.replaceWith(node);
          }
        }
      });

      this._addListeners(block);

      if (this._element instanceof HTMLElement) {
        this._element.replaceWith(block);
      }
      this._element = block;
    }
  }

  private _didUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
    const [isEqual, causeProps] = this._shallowEqual(oldProps, newProps);

    const shouldRender = this._updateInterceptor(!isEqual, causeProps, this);

    if (shouldRender) {
      this._eventBus.emit(EVENT.RENDER);
    }
  }

  protected _didMount() {}

  protected _updateInterceptor(
    shouldRender: boolean,
    causeProps: Map<string, unknown>,
    block: Block
  ): boolean {
    void causeProps, block;
    return shouldRender;
  }

  public dispatchDidMount() {
    this._eventBus.emit(EVENT.MOUNT);
  }

  public getContent() {
    return this._element as HTMLElement;
  }

  public setProps(newProps: IBlockProps) {
    this._updatingPropsNum = Object.keys(newProps).length;

    Object.assign(this._props, newProps);
  }
}

export { Block };
export type { IBlockProps };
