import { IUser } from './IUser.interface';

export interface IMessage {
  id: number;
  owner: IUser;
  content: string;
}

export interface AddMessageDto {
  content: string;
  userId: string;
  roomId: string;
}
