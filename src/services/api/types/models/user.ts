export type UserResponse = {
  data: {
    _id: string;
    email: string;
    name: string;
    surname: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type UsersResponse = {
  data: UserResponse['data'][];
};
