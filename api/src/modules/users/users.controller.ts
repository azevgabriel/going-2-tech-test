import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { USER_CONSTS } from './constants';
import { UserModel } from './interface/user';
import { CreateUserDto } from './dto/create-user.dto';
import { AddUserUseCaseService } from './services/use-cases/add-user/add-user.service';
import { UserRepositoryService } from './services/repository/users-repository.service';

@Controller(USER_CONSTS['route'])
export class UsersController {
  constructor(
    @Inject(USER_CONSTS['services']['useCases']['add'])
    private readonly addUserUseCaseService: AddUserUseCaseService,
    @Inject(USER_CONSTS['services']['repository']['service'])
    private readonly userRepository: UserRepositoryService,
  ) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  @Post()
  async addUser(@Body() createUser: CreateUserDto): Promise<UserModel> {
    return await this.addUserUseCaseService.addUser(createUser);
  }
}
