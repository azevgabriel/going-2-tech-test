export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'manager' | 'user' | 'admin';
  created_at: Date;
  created_by_user_id: string;
  updated_at: Date;
  updated_by_user_id: string;
}

export type AddUserModel = Omit<UserModel, 'id' | 'created_at' | 'updated_at'>;
