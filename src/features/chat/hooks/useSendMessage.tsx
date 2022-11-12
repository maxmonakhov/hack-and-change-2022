import { useQuery } from '@tanstack/react-query';
import { api, withAuthHeader } from '../../../api/axios';
import { UseQueryOptions } from '@tanstack/react-query/build/lib/types';

// export const useSendMessages = (
//   request: GetMessagesRequest,
//   options?: UseQueryOptions<GetMessagesResponse>
// ) => {
//   const dialogId = request.dialogId;
//
//   return useQuery<GetMessagesResponse>(
//     ['messages', dialogId],
//     async () => {
//       const response = await api.get<GetMessagesResponse>('chat/history', {
//         params: request,
//         headers: withAuthHeader()
//       });
//
//       return response.data;
//     },
//     options
//   );
// };
