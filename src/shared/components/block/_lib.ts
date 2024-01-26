import { Block } from './block.ts';
import { DOMEvent } from './_consts.ts';

type TIndexed = Record<string, unknown>;

type TBlockId = string;
type TEventType = string;

type TBlockEventsMap = Map<TEventType, EventListenerOrEventListenerObject>;

type TBlocksMap = Map<TBlockId, Block>;

export function shallowEqual(
  curProps: unknown,
  newProps: unknown
): [boolean, Map<string, unknown>] {
  const causeProps = new Map<string, unknown>();
  let isEqual = true;

  const curP = curProps as Record<string, unknown>;
  const newP = newProps as Record<string, unknown>;

  for (const key of Object.keys(newProps as Record<string, unknown>)) {
    if (!Object.is(curP[key], newP[key])) {
      causeProps.set(key, newP[key]);
      isEqual = false;
    }
  }

  return [isEqual, causeProps];
}

function isBlock(probBlock: unknown | Block): probBlock is Block<TIndexed> {
  return probBlock instanceof Block;
}

export function pickBlocksAndEvents(props: TIndexed): {
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

export function traverseBlocksTreeAndCall(
  this: Block<unknown>,
  method: Extract<keyof Block, 'willUnmount' | 'didUpdate' | 'didMount'>
): void {
  const stack: Block[] = [this];
  const colors: number[] = [1];

  while (stack.length) {
    const block = stack.pop();
    const color = colors.pop();

    if (!block || !color) {
      break;
    }

    if (color === 1) {
      stack.push(block);
      colors.push(2);
      const childBlocks = block.childBlocks;
      if (childBlocks) {
        for (const block of childBlocks.values()) {
          stack.push(block);
          colors.push(1);
        }
      }
    }

    if (color === 2) {
      block[method]();
    }
  }
}
