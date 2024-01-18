import { BubbleOwn } from 'shared/ui/bubble/bubble-viewer.block';
import { Bubble } from 'shared/ui/bubble/bubble-buddy.block';
import { type MessageProps } from './day-messages.block';

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
