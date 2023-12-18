import { Bubble, BubbleOwn } from 'shared/ui/bubble';
import { IMessage } from '.';

export function getMessageBlocks(list: IMessage[]) {
  return list.map((msgData, idx) => {
    const { status, time, text } = msgData;
    if (status) {
      return new BubbleOwn({ status, time, text, id: idx });
    }
    return new Bubble({ time, text, id: idx });
  });
}
