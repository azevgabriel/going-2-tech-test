import { UserModel } from "./User";

export interface AuthenticateUserModel {
  email: string;
  password: string;
}

export interface AuthenticateUserResponse {
  token: string;
  user: UserModel;
}
