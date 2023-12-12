interface IBlock {
  didMount(): void;
  didUpdate(): void;
  dispatchDidMount(): void;
  getContent(): void;
  setProps(arg: Record<string, unknown>): void;
}

interface IBlockInput extends IBlock {
  getType(): string;
  getName(): string;
  getValue(): string;
}

export type { IBlock, IBlockInput };
