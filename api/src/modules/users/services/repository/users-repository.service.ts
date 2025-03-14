import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { Repository } from 'typeorm';
import { AddUserModel, UpdateUserModel, UserModel } from '../../interface/user';
import { Users } from './typeorm/users.entity';

@Injectable()
export class UserRepositoryService {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.REPO.DB_USER_INSTANCE)
    private userRepository: Repository<Users>,
  ) {}

  async deleteById(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async findById(id: string): Promise<UserModel | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(data: AddUserModel): Promise<UserModel> {
    return await this.userRepository.save(data);
  }

  async updateById(
    id: string,
    data: UpdateUserModel,
  ): Promise<UserModel | null> {
    await this.userRepository.update({ id }, data);
    return await this.findById(id);
  }
}
