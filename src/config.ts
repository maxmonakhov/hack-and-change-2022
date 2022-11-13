const baseUrl = 'https://hack.invest-open.ru';
const fileUploaderAPIKey = 'public_12a1xs86Ty4DXYmCse8piPh4QS7L';

const refetchQueries = {
  enabled: true,
  refetchInterval: 100
};

const optimisticUpdateEnabled = false;

const fetchMessagesLimit = 30;

export const config = {
  baseUrl,
  fileUploaderAPIKey,
  refetchQueries,
  fetchMessagesLimit,
  optimisticUpdateEnabled
};
