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

export function pickBlocksAndEvents(props: IBlockProps): {
  blocks: Map<TBlockId, Block<IBlockProps>>;
  events: Map<TEventType, EventListenerOrEventListenerObject>;
} {
  const blocks = new Map<TBlockId, Block<IBlockProps>>();
  const events = new Map<TEventType, EventListenerOrEventListenerObject>();

  function setBlock(block: unknown): void {
    if (block instanceof Block) {
      blocks.set(block.stubId, block as Block<IBlockProps>);
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
