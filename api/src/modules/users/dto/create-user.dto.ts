export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: 'manager' | 'user' | 'admin';
  created_by_user_id: string;
  updated_by_user_id: string;
}
