import { ApiClient } from './apiClient';
import { AddMessageDto } from '../interfaces/IMessage.interface';
import { socketService } from '../services/socket.service';
import { config } from '../config/';

const apiClient = ApiClient.getInstance();

export const messageApi = {
  getMessages: async (roomId: String) => {
    try {
      const response = await apiClient.get(
        config.baseUrl + `/messages/${roomId}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addMessage: async (data: AddMessageDto) => {
    try {
      socketService.sendMessage(data);
      return null;
    } catch (error) {
      throw error;
    }
  },
  notifyTyping: async (roomId: string) => {
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
