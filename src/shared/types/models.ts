export type User = {
  id: string;
  name: string;
  email: string;
  surname: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthUser = {
  data: User;
  tokens: Tokens;
};

export type RegisterUser = {
  name: string;
  email: string;
  surname: string;
  password: string;
};
