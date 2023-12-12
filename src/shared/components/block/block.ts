import { template as templator } from 'handlebars/runtime';
import { EventBus } from '../../packages/event-bus';
import { uuid } from '../../packages/uuid';
import { pickBlocksAndEvents, shallowEqual } from './lib';
import { EVENT, TMP_TAG } from './consts';
import { IBlock } from '../interfaces';

interface IBlockProps {
  [key: string]: unknown;
}

abstract class Block implements IBlock {
  private _id = uuid();
  private _props: IBlockProps;
  private _eventBus = new EventBus();
  private _templator = templator;
  private _shallowEqual = shallowEqual;
  private _element: Node | null = null;
  private _updatingPropsNum = 0;

  constructor(props: IBlockProps = {}) {
    this._props = this._proxyProps(props);
    this._subscribe();
    this._eventBus.emit(EVENT.INIT, props);
  }

  public get id() {
    return this._id;
  }

  [Symbol.toPrimitive](a: 'string' | 'default' | 'number') {
    if (a === 'string' || a === 'default') {
      return `<${TMP_TAG} data-id=${this._id}></${TMP_TAG}>`;
    }
  }

  protected abstract _getTemplateSpec(): TemplateSpecification;
  protected _getStylesModule?(): CSSModuleClasses;

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
    this._eventBus.emit(EVENT.RENDER);
  }

  private _render() {
    const compileTemplate = this._templator(this._getTemplateSpec());
    const styles = this._getStylesModule ? this._getStylesModule() : {};
    const htmlCode = compileTemplate({
      ...this._props,
      styles,
    });
    const tmpElement = document.createElement('template');
    tmpElement.innerHTML = htmlCode;

    const block = tmpElement.content.firstChild;

    if (!(block instanceof HTMLElement)) {
      return;
    }

    const { blocks: childBlocks, events } = pickBlocksAndEvents(this._props);

    const stubs = Array.from(block.getElementsByTagName(TMP_TAG));

    stubs.forEach(stub => {
      if (stub instanceof HTMLUnknownElement && stub.dataset.id) {
        const childBlock = childBlocks.get(stub.dataset.id);

        const node = childBlock?.getContent();

        if (node) {
          stub.replaceWith(node);
          childBlock?.dispatchDidMount();
        }
      }
    });

    const selector = this._getListenersSelector();
    const listenersTarget = selector ? block.querySelector(selector) : block;

    events.forEach((cb, eventType) => {
      listenersTarget?.addEventListener(eventType, cb);
    });

    if (this._element instanceof HTMLElement) {
      this._element.replaceWith(block);
    }
    this._element = block;
  }

  protected renderInterceptor(
    shouldRender: boolean,
    _causeProps: Map<string, unknown>,
    _oldProps: IBlockProps,
    _block: Block
  ): boolean {
    return shouldRender;
  }

  protected _getListenersSelector() {
    return '';
  }

  private _didMount() {
    this.didMount();
  }

  private _didUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
    const [isEqual, causeProps] = this._shallowEqual(oldProps, newProps);

    const shouldRender = this.renderInterceptor(
      !isEqual,
      causeProps,
      oldProps,
      this
    );

    if (shouldRender) {
      this._eventBus.emit(EVENT.RENDER);
    }

    this.didUpdate();
  }

  public didMount() {}

  public didUpdate() {}

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
