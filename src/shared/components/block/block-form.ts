import { Block, IBlockProps } from '.';

interface IBlockFormProps {
  onSubmit?: (e: Event) => void;
}

abstract class BlockForm extends Block {
  constructor(props: IBlockFormProps & IBlockProps) {
    super(props);
  }

  public setProps(newProps: Partial<IBlockFormProps>): void {
    super.setProps(newProps);
  }
}

export { BlockForm };
export type { IBlockFormProps };
