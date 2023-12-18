export interface IBlock {
  didMount(): void;
  didUpdate(): void;
  dispatchDidMount(): void;
  getContent(): void;
  setProps(arg: Record<string, unknown>): void;
  setVisible(): void;
  setHidden(): void;
}

export interface IBlockInput extends IBlock {
  getType(): string;
  getName(): string;
  getValue(): string;
  setProps(props: {
    support?: string;
    error?: boolean;
    value?: string;
    onInput?: (e: Event) => void;
    onBlur?: (e: Event) => void;
  }): void;
}
