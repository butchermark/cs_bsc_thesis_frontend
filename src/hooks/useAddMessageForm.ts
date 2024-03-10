import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { AddMessageDto } from '../interfaces/IMessage.interface';
import {
  MessageFormValues,
  messageValidationSchema,
} from '../validation/messageValidation';
import { messageApi } from '../apiClient/messageApi';

export const useAddMessageForm = (userId: number) => {
  const formMethods = useForm<MessageFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(messageValidationSchema),
  });

  const addMessageHandler = useCallback(
    async ({ content }: MessageFormValues) => {
      try {
        const data: AddMessageDto = { content, userId };
        await messageApi.addMessage(data);
      } catch (error) {
        console.error('Error adding message:', error);
        throw error;
      }
    },
    [userId],
  );

  return {
    formMethods,
    onSubmit: formMethods.handleSubmit(addMessageHandler),
  };
};
