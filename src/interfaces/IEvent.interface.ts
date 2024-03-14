import { AddMessageDto, IMessage } from './IMessage.interface';

export interface ServerToClientEvents {
  message: (data: IMessage) => void;
  isTyping: (name: string) => void;
}

export interface ClientToServerEvents {
  message: (data: AddMessageDto) => void;
  join: (roomId: string) => void;
  leave: (roomId: string) => void;
  isTyping: (roomId: string) => void;
}
