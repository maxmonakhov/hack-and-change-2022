import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query';
import { api, withAuthHeader } from '../../../api/axios';
import { ChatMessage, ChatMessageType } from './useGetMessages';
import { AxiosError, AxiosResponse } from 'axios';

export type SendMessageRequest = {
  dialogId: number;
  text: string;
  messageType: ChatMessageType;
  data?: {};
  mediaUrl?: string;
};

type SendMessageRequestAxios = {
  message: SendMessageRequest;
};

type SendMessageResponse = {
  messageId: string;
};

type UseSendMessageProps = {
  optimisticUpdateData?: {
    sender: number;
    recipient: number;
  };
};

export const useSendMessage = (
  props: UseSendMessageProps,
  options?: UseMutationOptions<
    SendMessageResponse,
    unknown,
    SendMessageRequest,
    { previousMessages: ChatMessage[] }
  >
) => {
  const { optimisticUpdateData } = props;

  const queryClient = useQueryClient();

  return useMutation<
    SendMessageResponse,
    AxiosError,
    SendMessageRequest,
    { previousMessages: ChatMessage[] }
  >(
    async (request) => {
      console.log('--- SENDING REQUEST:', request);

      const formattedRequest = { ...request };

      if (request.data) formattedRequest['data'] = JSON.stringify(request.data);

      const response = await api.post<
        SendMessageResponse,
        AxiosResponse<SendMessageResponse>,
        SendMessageRequestAxios
      >(
        'message/send',
        { message: formattedRequest },
        { headers: withAuthHeader() }
      );

      return response.data;
    },
    {
      onMutate: async (request) => {
        if (optimisticUpdateData) {
          const { sender, recipient } = optimisticUpdateData;

          await queryClient.cancelQueries({ queryKey: ['messages'] });

          const previousMessages = queryClient.getQueryData<ChatMessage[]>([
            'messages'
          ]);

          queryClient.setQueryData<ChatMessage[]>(['messages'], (old) => {
            const oldMessages = old || [];

            return [
              ...oldMessages,
              {
                ...request,
                messageId: 'optimistically_updated_user',
                sender,
                recipient,
                timestamp: new Date().getTime()
              }
            ];
          });

          return { previousMessages: previousMessages || [] };
        }
      },
      onError: (err, request, context) => {
        if (optimisticUpdateData) {
          queryClient.setQueryData<ChatMessage[]>(
            ['messages'],
            context?.previousMessages
          );
        }
      },
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: ['messages'] });
      },
      ...options
    }
  );
};
