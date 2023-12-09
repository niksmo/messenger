import { Block, IBlockProps } from '.';
import { DOMEvent } from './consts';

export function shallowEqual(
  oldProps: IBlockProps,
  newProps: IBlockProps
): [boolean, Map<string, unknown>] {
  const causeProps = new Map<string, unknown>();
  let isEqual = true;
  for (const key of Object.keys(newProps)) {
    if (!Object.is(oldProps[key], newProps[key])) {
      causeProps.set(key, newProps[key]);
      isEqual = false;
    }
  }

  return [isEqual, causeProps];
}

type TBlockId = string;
type TEventType = string;

export function pickBlocksAndEvents(props: IBlockProps): {
  blocks: Map<TBlockId, Block>;
  events: Map<TEventType, Function>;
} {
  const blocks = new Map<TBlockId, Block>();
  const events = new Map<TEventType, Function>();

  const propsEntries = [...Object.entries(props)];

  propsEntries.forEach(([pKey, pValue]) => {
    if (Array.isArray(pValue)) {
    }

    if (DOMEvent[pKey]) {
    }
  });

  return { blocks, events };
}
