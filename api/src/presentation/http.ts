import { Request } from 'express';
import { UserModel } from 'src/modules/users/interface/user';

export type UserPayload = Pick<UserModel, 'id'>;

export type HttpRequest = Request & {
  user: Omit<UserModel, 'password'>;
};
