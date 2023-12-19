import { Block, type IBlockProps } from './block';
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
export type TBlockEventsMap = Map<
  TEventType,
  EventListenerOrEventListenerObject
>;
export type TBlocksMap = Map<TBlockId, Block>;

function isBlock(probBlock: unknown | Block): probBlock is Block<IBlockProps> {
  return probBlock instanceof Block;
}

export function pickBlocksAndEvents(props: IBlockProps): {
  blocks: TBlocksMap;
  events: TBlockEventsMap;
} {
  const blocks: TBlocksMap = new Map();
  const events: TBlockEventsMap = new Map();

  function setBlock(probBlock: unknown | Block): void {
    if (isBlock(probBlock)) {
      const block = probBlock;
      blocks.set(block.stubId, block);
    }
  }

  const propsEntries = Object.entries(props);

  propsEntries.forEach(([pKey, pValue]) => {
    setBlock(pValue);

    if (Array.isArray(pValue)) {
      const list = pValue;
      list.forEach(setBlock);
    }

    if (DOMEvent[pKey] && typeof pValue === 'function') {
      const normilezedType = pKey.slice(2).toLowerCase();
      events.set(normilezedType, pValue as EventListenerOrEventListenerObject);
    }
  });

  return { blocks, events };
}
