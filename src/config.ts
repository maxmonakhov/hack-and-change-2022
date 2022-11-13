const baseUrl = 'https://hack.invest-open.ru';
const fileUploaderAPIKey = 'public_12a1xs86Ty4DXYmCse8piPh4QS7L';

const refetchQueries = {
  enabled: false,
  refetchInterval: 100
};

const optimisticUpdateEnabled = false;

export const config = {
  baseUrl,
  fileUploaderAPIKey,
  refetchQueries,
  optimisticUpdateEnabled
};
