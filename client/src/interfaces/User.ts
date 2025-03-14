export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: "manager" | "user" | "admin";
  password: string;
  created_at: Date;
  created_by_user_id?: string;
  updated_at: Date;
  updated_by_user_id?: string;
}

export type AddUserModel = Omit<
  UserModel,
  | "id"
  | "created_at"
  | "created_by_user_id"
  | "updated_at"
  | "updated_by_user_id"
  | "role"
>;

export type UpdateUserModel = Partial<
  Omit<
    UserModel,
    | "id"
    | "created_at"
    | "created_by_user_id"
    | "updated_at"
    | "updated_by_user_id"
  >
>;
