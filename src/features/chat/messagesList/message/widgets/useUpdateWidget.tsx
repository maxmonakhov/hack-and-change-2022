import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api, withAuthHeader } from '../../../../../api/axios';

type UpdateWidgetRequest = {
  messageId: string;
  data: {} | null;
};

type UpdateWidgetRequestAxios = UpdateWidgetRequest & {
  data: string;
};

export const useUpdateWidget = () => {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError, UpdateWidgetRequest>(
    async (request) => {
      const formattedRequest = { ...request };

      if (request.data) formattedRequest['data'] = JSON.stringify(request.data);

      const response = await api.post<UpdateWidgetRequestAxios, null>(
        'chat/message/update',
        {
          ...formattedRequest
        },
        { headers: withAuthHeader() }
      );

      return null;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(['messages']);
      }
    }
  );
};
