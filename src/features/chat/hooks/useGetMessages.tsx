import { useQuery } from '@tanstack/react-query';
import { api, withAuthHeader } from '../../../api/axios';
import { UseQueryOptions } from '@tanstack/react-query/build/lib/types';

export type ChatMessageType = 'TEXT' | 'MEDIA' | 'WIDGET';

export type ChatMessage = {
  messageId: string;
  text: string;
  data?: {} | null;
  messageType: ChatMessageType;
  mediaUrl?: string | null;
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
    widgetData: {};
  };
};

export type SignableWidget = Widget & {
  data: {
    widgetType: 'SIGNABLE';
    widgetData: { isSigned: boolean };
  };
};

export type InvestIdeaWidget = Widget & {
  data: {
    widgetType: 'INVEST_IDEA';
    widgetData: {
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

type ChatMessageWithStringData = ChatMessage & {
  data: string | null;
};

type GetMessagesResponseAxios = {
  messages: ChatMessageWithStringData[];
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

      const messages = response.data.messages;

      const transformedMessages = messages.map((message) => {
        let data = message.data;
        if (data) {
          try {
            data = JSON.parse(data);
          } catch (e) {}
        }

        return {
          ...message,
          data
        };
      });

      return transformedMessages;
    },
    options
  );
};
