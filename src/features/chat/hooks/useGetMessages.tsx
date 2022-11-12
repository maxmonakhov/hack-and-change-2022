import { useQuery } from '@tanstack/react-query';
import { api, withAuthHeader } from '../../../api/axios';
import { UseQueryOptions } from '@tanstack/react-query/build/lib/types';

type MessageType = 'TEXT' | 'MEDIA' | 'WIDGET';

export type ChatMessage = {
  messageId: string;
  text: string;
  data: {} | null;
  messageType: MessageType;
  mediaUrl: string | null;
  sender: number;
  recipient: number;
  dialogId: number;
  timestamp: number;
};

type GetMessagesRequest = {
  dialogId: number;
  limit?: number;
};

type GetMessagesResponse = {
  messages: [ChatMessage];
};

export const useGetMessages = (
  request: GetMessagesRequest,
  options?: UseQueryOptions<GetMessagesResponse>
) => {
  const dialogId = request.dialogId;

  return useQuery<GetMessagesResponse>(
    ['messages', dialogId],
    async () => {
      const response = await api.get<GetMessagesResponse>('chat/history', {
        params: request,
        headers: withAuthHeader()
      });

      return response.data;
    },
    options
  );
};
