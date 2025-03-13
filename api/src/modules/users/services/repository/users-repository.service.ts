import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './typeorm/users.entity';
import { AddUserModel, UpdateUserModel, UserModel } from '../../interface/user';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';

@Injectable()
export class UserRepositoryService {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.REPO.DB_USER_INSTANCE)
    private userRepository: Repository<Users>,
  ) {}

  async findById(id: string): Promise<UserModel | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Users[]> {
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

  async updateById(
    id: string,
    data: UpdateUserModel,
  ): Promise<UserModel | null> {
    await this.userRepository.update({ id }, data);
    return await this.findById(id);
  }
}
