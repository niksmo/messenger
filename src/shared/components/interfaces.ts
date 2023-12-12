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

interface IFormController {
  addElement(block: IBlockInput): void;
}

export type { IBlock, IBlockInput, IFormController };
