export type UserResponse = {
  data: {
    email: string;
    name: string;
    surname: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

export type SignInResponse = {
  data: {
    email: string;
    name: string;
    surname: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
