import { useQuery } from '@tanstack/react-query';
import { api, withAuthHeader } from '../../../api/axios';
import { UseQueryOptions } from '@tanstack/react-query/build/lib/types';

export type ChatMessageType = 'TEXT' | 'MEDIA' | 'WIDGET';

export type ChatMessage = {
  messageId: string;
  text: string;
  data?: {};
  messageType: ChatMessageType;
  mediaUrl?: string;
  sender: number;
  recipient: number;
  dialogId: number;
  timestamp: number;
};

export type WidgetType = 'SIGNABLE' | 'INVEST_IDEA';

export type Widget = ChatMessage & {
  messageType: 'WIDGET';
  data: {
    widgetType: WidgetType;
    data: {};
  };
};

export type SignableWidget = Widget & {
  data: {
    widgetType: 'SIGNABLE';
    data: { isSigned: boolean };
  };
};

export type InvestIdeaWidget = Widget & {
  data: {
    widgetType: 'INVEST_IDEA';
    data: {
      symbol: string;
      quantity: number;
      price: number;
      timestamp: number;
    };
  };
};

type GetMessagesRequest = {
  dialogId: number;
  limit?: number;
};

type GetMessagesResponse = ChatMessage[];

type GetMessagesResponseAxios = {
  messages: ChatMessage[];
};

export const useGetMessages = (
  request: GetMessagesRequest,
  options?: UseQueryOptions<GetMessagesResponse>
) => {
  const dialogId = request.dialogId;

  return useQuery<GetMessagesResponse>(
    ['messages', dialogId],
    async () => {
      const response = await api.get<GetMessagesResponseAxios>('chat/history', {
        params: request,
        headers: withAuthHeader()
      });

      return response.data.messages;
    },
    options
  );
};
