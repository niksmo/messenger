import { type BlockProps } from 'shared/components/block';

type AvatarProps = BlockProps<{
  name?: string;
}>;

export function setNamePrefixToProps(props: AvatarProps): AvatarProps {
  const { name } = props;
  if (name) {
    props.namePrefix = name[0]?.toUpperCase();
  }
  return props;
}
