import { jwtService } from '../../../services/JWTService';
import { UserDataWithJWT } from '../../../api';

export type AuthData = {
  isAuthorized: boolean;
  user: UserDataWithJWT | null;
};

export const getAuthData = (): AuthData => {
  const userData = jwtService.getUserData();

  return { isAuthorized: !!userData, user: userData };
};
