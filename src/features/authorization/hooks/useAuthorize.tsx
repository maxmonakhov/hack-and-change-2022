import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '../../../api/axios';

import { sha256 } from 'js-sha256';
import { UserDataWithJWT } from '../../../api';

type AuthorizeRequest = {
  login: string;
  password: string;
};

type AuthorizeResponse = UserDataWithJWT;

export const useAuthorize = (
  options?: UseMutationOptions<AuthorizeResponse, unknown, AuthorizeRequest>
) => {
  return useMutation<UserDataWithJWT, unknown, AuthorizeRequest>(
    async (request) => {
      const { login, password } = request;

      const response = await api.post<UserDataWithJWT>('auth', {
        login,
        password: sha256(password)
      });

      return response.data;
    },
    options
  );
};
