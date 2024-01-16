import { Bubble, BubbleOwn } from 'shared/ui/bubble';
import { type MessageProps } from '.';

export function getMessageBlocks(
  list: MessageProps[]
): Array<BubbleOwn | Bubble> {
  return list.map((msgData, idx) => {
    const { status, time, text } = msgData;
    if (status !== undefined) {
      return new BubbleOwn({ status, time, text, id: idx });
    }
    return new Bubble({ time, text, id: idx });
  });
}
