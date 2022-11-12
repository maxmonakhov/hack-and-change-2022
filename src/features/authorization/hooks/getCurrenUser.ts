import { jwtService } from '../../../services/JWTService';

export const getCurrenUser = () => {
  return jwtService.getUserData();
};
