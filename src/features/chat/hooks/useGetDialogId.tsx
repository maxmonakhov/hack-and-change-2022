import { useQuery } from '@tanstack/react-query';
import { api, withAuthHeader } from '../../../api/axios';
import { UseQueryOptions } from '@tanstack/react-query/build/lib/types';

type GetDialogIdResponse = {
  dialogId: number;
};

export const useGetDialogId = (
  options?: UseQueryOptions<GetDialogIdResponse>
) => {
  return useQuery<GetDialogIdResponse>(
    ['dialogId'],
    async () => {
      const response = await api.get<GetDialogIdResponse>('chat/dialog', {
        headers: withAuthHeader()
      });

      return response.data;
    },
    options
  );
};
