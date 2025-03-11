import { Body, Controller, Get, Post } from '@nestjs/common';
import { USER_CONSTS } from './constants';
import { UserModel } from './interface/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepositoryService } from './services/repository/users-repository.service';
import { AddUserUseCaseService } from './services/use-cases/add-user/add-user.service';

@Controller(USER_CONSTS['route'])
export class UsersController {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly addUserAddUserService: AddUserUseCaseService,
  ) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return await this.userRepository.findAll();
  }

  @Post()
  async addUser(@Body() createUser: CreateUserDto): Promise<UserModel> {
    return await this.addUserAddUserService.addUser(createUser);
  }
}
