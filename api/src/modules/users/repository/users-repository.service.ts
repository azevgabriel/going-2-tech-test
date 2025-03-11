import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { USER_CONSTS } from '../constants';
import { User } from './typeorm/user.entity';
import { AddUserModel, UserModel } from '../interface/user';

@Injectable()
export class UserRepositoryService {
  constructor(
    @Inject(USER_CONSTS['repository'])
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return this.userRepository.find();
  }

  async create(user: AddUserModel): Promise<UserModel> {
    return this.userRepository.save(user);
  }
}
