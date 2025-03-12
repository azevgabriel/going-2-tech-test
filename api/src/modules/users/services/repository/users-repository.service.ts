import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { USER_CONSTS } from '../../constants';
import { Users } from './typeorm/users.entity';
import { AddUserModel, UserModel } from '../../interface/user';

@Injectable()
export class UserRepositoryService {
  constructor(
    @Inject(USER_CONSTS['services']['repository']['typeorm_db_provider'])
    private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(data: AddUserModel): Promise<UserModel> {
    const user = new Users();

    user.name = data.name;
    user.password = data.password;
    user.email = data.email;
    user.role = data.role;

    return await this.userRepository.save(user);
  }
}
