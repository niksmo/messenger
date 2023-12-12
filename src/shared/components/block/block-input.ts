import { Block, IBlockProps } from '.';
import { IBlockInput } from '../interfaces';

interface IBlockInputProps {
  type: string;
  name: string;
  value?: string;
}

abstract class BlockInput extends Block implements IBlockInput {
  private _type: string;
  private _name: string;
  private _value: string;
  constructor(props: IBlockInputProps & IBlockProps) {
    super(props);
    const { type, name, value } = props;
    this._type = type;
    this._name = name;
    this._value = value || '';
  }

  public getType(): string {
    return this._type;
  }
  public getName(): string {
    return this._name;
  }
  public getValue(): string {
    return this._value;
  }

  public setProps(newProps: Partial<IBlockInputProps>): void {
    const { value } = newProps;

    if (typeof value !== 'undefined') {
      this._value = String(value);
    }

    super.setProps(newProps);
  }
}

export { BlockInput };
export type { IBlockInputProps };
