import { useMutation } from '@tanstack/react-query';
import { api } from '../../../api/axios';

import { sha256 } from 'js-sha256';
import { UserDataWithJWT } from '../../../api';

type AuthorizeRequest = {
  login: string;
  password: string;
};

export const useAuthorize = () => {
  return useMutation<UserDataWithJWT, Error, AuthorizeRequest>(
    async (request) => {
      const { login, password } = request;

      const response = await api.post<UserDataWithJWT>('auth', {
        login,
        password: sha256(password)
      });

      return response.data;
    }
  );
};
