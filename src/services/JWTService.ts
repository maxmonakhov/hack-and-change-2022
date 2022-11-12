import { default as jwt } from 'jsonwebtoken';
import { BaseUserData, UserDataWithJWT } from '../api';

const TOKEN_ID = 'token';

class UserService {
  public setJWTToken(token: string) {
    localStorage.setItem(TOKEN_ID, token);
  }

  public getJWTToken() {
    return localStorage.getItem(TOKEN_ID);
  }

  public clearJWTToken() {
    localStorage.removeItem(TOKEN_ID);
  }

  public getUserData(): UserDataWithJWT | null {
    const jwtToken = this.getJWTToken();
    if (!jwtToken) return null;

    const userDataFromJWTToken = jwt.decode(jwtToken) as BaseUserData;

    return {
      ...userDataFromJWTToken,
      jwtToken
    };
  }
}

export const jwtService = new UserService();
