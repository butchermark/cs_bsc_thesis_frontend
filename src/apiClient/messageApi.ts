import { ApiClient } from './apiClient';
import { AddMessageDto } from '../interfaces/IMessage.interface';
import { socketService } from '../services/socket.service';
import { config } from '../config/';

const apiClient = ApiClient.getInstance();

export const messageApi = {
  getMessages: async (roomId: number) => {
    try {
      const response = await apiClient.get(
        config.baseUrl + `/messages/${roomId}`,
        { roomId },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addMessage: async (data: AddMessageDto) => {
    try {
      await apiClient.post(config.baseUrl + `/messages/${data.userId}`, data);
      socketService.sendMessage(data);
      return null;
    } catch (error) {
      throw error;
    }
  },
  notifyTyping: async (roomId: number) => {
    try {
      await apiClient.post(config.baseUrl + `/${roomId}`, { roomId });
      socketService.notifyTyping(roomId);
      return null;
    } catch (error) {
      throw error;
    }
  },
  getTypingNotifications: async () => {
    try {
      const response = await apiClient.get(config.baseUrl + `/messages`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
