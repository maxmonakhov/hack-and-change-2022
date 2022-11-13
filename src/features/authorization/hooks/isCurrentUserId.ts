import { jwtService } from '../../../services/JWTService';

export const isCurrentUserId = (id: number) => {
  return jwtService.getUserData()?.userId === id;
};
