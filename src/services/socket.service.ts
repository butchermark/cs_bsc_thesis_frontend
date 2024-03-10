import { io, Socket } from 'socket.io-client';
import { config } from '../config';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../interfaces/IEvent.interface';

import { AddMessageDto } from '../interfaces/IMessage.interface';

class SocketService {
  private readonly socket:
    | Socket<ServerToClientEvents, ClientToServerEvents>
    | undefined;

  constructor() {
    if (!config.socketUrl) {
      throw new Error('Socket URL is not defined');
    }
    this.socket = io(config.socketUrl, {
      autoConnect: false,
    });
  }

  connectWithAuthToken(token: string) {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    this.socket.auth = { token };
    this.socket.connect();
  }

  disconnect() {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    this.socket.disconnect();
  }

  sendMessage(data: AddMessageDto) {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    this.socket.emit('message', data);
  }

  notifyTyping(roomId: number) {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    this.socket.emit('isTyping', roomId);
  }

  subscribeToMessages(messageHandler: ServerToClientEvents['message']) {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    this.socket.on('message', messageHandler);
  }

  subscribeToTypingNotifications(
    typingNotificationsHandler: ServerToClientEvents['isTyping'],
  ) {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    this.socket.on('isTyping', typingNotificationsHandler);
  }

  joinRoom(roomId: number) {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    this.socket.emit('join', roomId);
  }

  leaveRoom(roomId: number) {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    this.socket.emit('leave', roomId);
  }
}
export const socketService = new SocketService();
