import { Controller, Get } from '@nestjs/common';
import { USER_CONSTS } from '../constants';

@Controller(USER_CONSTS.get('route') || 'users')
export class UsersController {
  constructor(
    private readonly photoRepositoryService: PhotoRepositoryService,
  ) {}

  @Get()
  getUsers(): string {
    return 'Hello Users!';
  }
}
