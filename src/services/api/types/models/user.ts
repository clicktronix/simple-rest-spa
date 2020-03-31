export type UserResponse = {
  user: {
    _id: string;
    email: string;
    name: string;
    surname: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type UsersResponse = {
  users: UserResponse['user'][];
};
