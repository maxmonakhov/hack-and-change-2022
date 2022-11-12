type ROLE = 'CLIENT' | 'OPERATOR';

export type BaseUserData = {
  userId: number;
  login: string;
  role: ROLE;
};

export type UserDataWithJWT = BaseUserData & {
  jwtToken: string;
};
