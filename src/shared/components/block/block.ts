import { template as templator } from 'handlebars/runtime';
import { EventBus } from 'shared/packages/event-bus';
import { uuid } from 'shared/packages/uuid';
import { type IBlock } from '../interfaces';
import { type TBlockEventsMap, pickBlocksAndEvents, shallowEqual } from './lib';
import { EVENT, TMP_TAG } from './consts';

type IBlockProps = Record<string, unknown>;

abstract class Block<TProps extends IBlockProps = IBlockProps>
  implements IBlock
{
  private readonly _stubId = uuid();
  private readonly _eventBus = new EventBus();
  private readonly _templator = templator;
  private readonly _shallowEqual = shallowEqual;
  private _element: Node | null = null;
  private _updatingPropsNum = 0;
  private _events: TBlockEventsMap | null = null;
  protected props;

  constructor(props: TProps | IBlockProps = {}) {
    this.props = this._proxyProps(props);
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

  protected abstract _getTemplateSpec(): TemplateSpecification;
  protected _getStylesModule?(): CSSModuleClasses;

  private _proxyProps(props: IBlockProps): IBlockProps {
    const self = this;
    let propsCounter = 0;
    let oldProps: IBlockProps = {};
    const newProps: IBlockProps = {};

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

  private _subscribe(): void {
    this._eventBus.on(EVENT.INIT, this._init.bind(this));
    this._eventBus.on(EVENT.MOUNT, this._didMount.bind(this));
    this._eventBus.on(EVENT.UPDATE, this._didUpdate.bind(this));
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
    const compileTemplate = this._templator(this._getTemplateSpec());
    const styles = this._getStylesModule ? this._getStylesModule() : {};
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

    const stubs = Array.from(block.getElementsByTagName(TMP_TAG));

    stubs.forEach((stub) => {
      if (stub instanceof HTMLUnknownElement && stub.dataset.id) {
        const childBlock = childBlocks.get(stub.dataset.id);

        const node = childBlock?.getContent();

        if (node) {
          stub.replaceWith(node);
          childBlock?.dispatchDidMount();
        }
      }
    });

    this._removeEvents();

    const selector = this._getListenersSelector();
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

  protected renderInterceptor(
    shouldRender: boolean,
    _causeProps: Map<string, unknown>,
    _oldProps: IBlockProps,
    _block: Block<TProps>
  ): boolean {
    return shouldRender;
  }

  protected _getListenersSelector(): string {
    return '';
  }

  private _didMount(): void {
    this.didMount();
  }

  private _didUpdate(oldProps: TProps, newProps: TProps): void {
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

  public didMount(): void {}

  public didUpdate(): void {}

  public dispatchDidMount(): void {
    this._eventBus.emit(EVENT.MOUNT);
  }

  public getContent(): HTMLElement {
    return this._element as HTMLElement;
  }

  public setProps(newProps: Partial<TProps | IBlockProps>): void {
    this._updatingPropsNum = Object.keys(newProps).length;

    Object.assign(this.props, newProps);
  }

  public setVisible(): void {
    this.getContent().style.display = 'block';
  }

  public setHidden(): void {
    this.getContent().style.display = 'none';
  }
}

export { Block };
export type { IBlockProps };
