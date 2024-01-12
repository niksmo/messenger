import { type IBlockProps } from 'shared/components/block';

interface IAvatarProps extends IBlockProps {
  name?: string;
}

export function setNamePrefixToProps(props: IAvatarProps): IBlockProps {
  const { name } = props;
  if (name) {
    props.namePrefix = name[0]?.toUpperCase();
  }
  return props;
}
