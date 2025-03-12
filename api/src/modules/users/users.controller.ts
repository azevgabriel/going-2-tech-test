import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { USER_CONSTS } from './constants';
import { UserModel } from './interface/user';
import { CreateUserDto } from './dto/create-user.dto';
import { AddUserUseCaseService } from './services/use-cases/add-user/add-user.service';
import { UserRepositoryService } from './services/repository/users-repository.service';
import {
  Action,
  CaslAbilityFactory,
} from 'src/modules/casl/casl-ability.factory/casl-ability.factory';
import { HttpRequest } from 'src/presentation/http';
import { Users } from './services/repository/typeorm/users.entity';
import { Public } from 'src/presentation/decorators/public.decorator';

@Controller(USER_CONSTS['route'])
export class UsersController {
  constructor(
    @Inject(USER_CONSTS['services']['useCases']['add'])
    private readonly userUserUseCaseService: AddUserUseCaseService,
    @Inject(USER_CONSTS['services']['repository']['service'])
    private readonly userRepository: UserRepositoryService,
    @Inject('CASL_ABILITY_FACTORY')
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  async getUsers(@Req() request: HttpRequest): Promise<UserModel[]> {
    const user = request.user;

    const ability = await this.caslAbilityFactory.createForUser(user);

    if (ability.can(Action.ReadAll, Users))
      return await this.userRepository.findAll();

    throw new HttpException(
      'User does not have permission for this action',
      HttpStatus.FORBIDDEN,
    );
  }

  @Public()
  @Post()
  async addUser(@Body() createUser: CreateUserDto): Promise<UserModel> {
    return await this.userUserUseCaseService.addUser(createUser);
  }
}
