import { Block, type IBlockProps } from '.';
import { type IBlockInput } from '../interfaces';

interface IBlockInputProps extends IBlockProps {
  type?: string;
  name?: string;
  value?: string;
  onInput?: (e: Event) => void;
}

abstract class BlockInput<TProps extends IBlockInputProps = IBlockInputProps>
  extends Block<TProps>
  implements IBlockInput
{
  private readonly _type: string;
  private readonly _name: string;
  private _value: string;

  constructor(props: IBlockInputProps | TProps = {}) {
    super(props);
    const { type, name, value } = props;
    this._type = type ?? '';
    this._name = name ?? '';
    this._value = value ?? '';
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

  public setProps(newProps: Partial<TProps | IBlockInputProps>): void {
    const { value } = newProps;

    if (typeof value !== 'undefined') {
      this._value = String(value);
    }

    super.setProps(newProps);
  }
}

export { BlockInput };
export type { IBlockInputProps };
