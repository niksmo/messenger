import { template as templator } from 'handlebars/runtime';
import EventBus from 'shared/packages/event-bus';
import uuid from 'shared/packages/uuid';
import { type IBlock } from '../interfaces';
import {
  type TBlockEventsMap,
  pickBlocksAndEvents,
  shallowEqual,
  traverseBlocksTreeAndCall,
} from './lib';
import { EVENT, TMP_TAG } from './consts';

export type TIndexed<T = unknown> = T extends Record<infer K, infer V>
  ? { [key in K]: V }
  : Record<string, unknown>;

export abstract class Block<TProps = Record<string, unknown>>
  implements IBlock
{
  private readonly _stubId = uuid();
  private readonly _eventBus = new EventBus();
  private readonly _templator = templator;
  private readonly _shallowEqual = shallowEqual;
  private _element: Node | null = null;
  private _updatingPropsNum = 0;
  private _events: TBlockEventsMap | null = null;
  protected childBlocks: Map<string, Block> | null = null;
  protected props;

  constructor(props?: TIndexed<TProps>) {
    this.props = this._proxyProps(props ?? {});
    this._subscribe();
    this._eventBus.emit(EVENT.INIT, props);
  }

  public get stubId(): string {
    return this._stubId;
  }

  [Symbol.toPrimitive](a: 'string' | 'default' | 'number'): string | undefined {
    if (a === 'string' || a === 'default') {
      return `<${TMP_TAG} data-id=${this._stubId}></${TMP_TAG}>`;
    }
  }

  protected abstract getTemplateHook(): TemplateSpecification;
  protected getStylesModuleHook?(): CSSModuleClasses;

  private _proxyProps(props: TIndexed): TIndexed {
    const self = this;
    let propsCounter = 0;
    let oldProps: TIndexed = {};
    const newProps: TIndexed = {};

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
          self._eventBus.emit(EVENT.COMPARE, oldProps, newProps);
          propsCounter = 0;
        }

        return true;
      },
    });
  }

  private _subscribe(): void {
    this._eventBus.on(EVENT.INIT, this._init.bind(this));
    this._eventBus.on(EVENT.MOUNT, this._didMount.bind(this));
    this._eventBus.on(EVENT.UPDATE, this._didUpdate.bind(this));
    this._eventBus.on(EVENT.UNMOUNT, this._willUnmount.bind(this));
    this._eventBus.on(EVENT.COMPARE, this._compareProps.bind(this));
    this._eventBus.on(EVENT.RENDER, this._render.bind(this));
  }

  private _init(): void {
    this._eventBus.emit(EVENT.RENDER);
  }

  private _removeEvents(): void {
    if (this._events !== null) {
      this._events.forEach((cb, type) => {
        this._element?.removeEventListener(type, cb);
      });
    }
  }

  private _render(): void {
    const compileTemplate = this._templator(this.getTemplateHook());
    const styles = this.getStylesModuleHook ? this.getStylesModuleHook() : {};
    const htmlCode = compileTemplate({
      ...this.props,
      styles,
    });
    const tmpElement = document.createElement('template');
    tmpElement.innerHTML = htmlCode;

    const block = tmpElement.content.firstChild;

    if (!(block instanceof HTMLElement)) {
      throw TypeError('Block is not HTMLElement');
    }

    const { blocks: childBlocks, events: propsEvents } = pickBlocksAndEvents(
      this.props
    );

    this.childBlocks = childBlocks;

    const stubs = Array.from(block.getElementsByTagName(TMP_TAG));

    stubs.forEach((stub) => {
      if (stub instanceof HTMLUnknownElement && stub.dataset.id) {
        const childBlock = childBlocks.get(stub.dataset.id);

        const node = childBlock?.getContent();

        if (node) {
          stub.replaceWith(node);
        }
      }
    });

    this._removeEvents();

    const selector = this.getListenersSelectorHook();
    const listenersTarget = selector ? block.querySelector(selector) : block;

    propsEvents.forEach((cb, eventType) => {
      listenersTarget?.addEventListener(eventType, cb);
    });

    if (this._element instanceof HTMLElement) {
      this._element.replaceWith(block);
    }

    this._events = propsEvents;
    this._element = block;
  }

  protected renderInterceptorHook(
    shouldRender: boolean,
    _causeProps: Map<string, unknown>,
    _oldProps: TIndexed<TProps>
  ): boolean {
    return shouldRender;
  }

  protected getListenersSelectorHook(): string {
    return '';
  }

  private _didMount(): void {
    traverseBlocksTreeAndCall.call(this, 'didMount');
  }

  private _didUpdate(): void {
    traverseBlocksTreeAndCall.call(this, 'didUpdate');
  }

  private _willUnmount(): void {
    traverseBlocksTreeAndCall.call(this, 'willUnmount');
  }

  private _compareProps(
    oldProps: TIndexed<TProps>,
    newProps: TIndexed<TProps>
  ): void {
    const [isEqual, causeProps] = this._shallowEqual(oldProps, newProps);

    const shouldRender = this.renderInterceptorHook(
      !isEqual,
      causeProps,
      oldProps
    );

    if (shouldRender) {
      this._eventBus.emit(EVENT.RENDER);
    }

    this._eventBus.emit(EVENT.UPDATE);
  }

  public didMount(): void {}

  public didUpdate(): void {}

  public willUnmount(): void {}

  public dispatchDidMount(): void {
    this._eventBus.emit(EVENT.MOUNT);
  }

  public dispatchDidUpdate(): void {
    this._eventBus.emit(EVENT.UPDATE);
  }

  public dispatchWillUnmount(): void {
    this._eventBus.emit(EVENT.UNMOUNT);
  }

  public getContent(): HTMLElement {
    return this._element as HTMLElement;
  }

  public setProps(props: Partial<TIndexed<TProps>>): void {
    this._updatingPropsNum = Object.keys(props).length;

    Object.assign(this.props, props);
  }
}
