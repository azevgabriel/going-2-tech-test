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
    return this.userRepository.find();
  }

  async create(data: AddUserModel): Promise<UserModel> {
    return await this.userRepository.save(data);
  }
}
