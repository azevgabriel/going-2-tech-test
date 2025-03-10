import { Controller, Get } from '@nestjs/common';
import { USER_CONSTS } from '../constants';
import { UserRepositoryService } from '../repository/users.service';

@Controller(USER_CONSTS.get('route') || 'users')
export class UsersController {
  constructor(private readonly userRepository: UserRepositoryService) {}

  @Get()
  getUsers(): string {
    return 'Hello Users!';
  }
}
