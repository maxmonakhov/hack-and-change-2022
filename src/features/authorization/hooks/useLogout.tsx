import { useRouter } from 'next/router';
import { jwtService } from '../../../services/JWTService';

export const useLogout = () => {
  const { push } = useRouter();

  return () => {
    jwtService.clearJWTToken();
    push('login');
  };
};
