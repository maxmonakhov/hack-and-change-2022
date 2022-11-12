import { jwtService } from '../../../services/JWTService';

export const isAuthorized = () => {
  return !!jwtService.getUserData();
};
