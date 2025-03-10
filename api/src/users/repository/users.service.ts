import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { USER_CONSTS } from '../constants';
import { User } from './typeorm/user.entity';

@Injectable()
export class UserRepositoryService {
  constructor(
    @Inject(USER_CONSTS.get('repository'))
    private photoRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.photoRepository.find();
  }
}
