import { User } from 'shared/types/models';

export type MessageResponse = {
  content: string;
  sender: User;
};
