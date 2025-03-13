import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AddUserModel, UpdateUserModel, UserModel } from './interface/user';
import { AddUserUseCaseService } from './services/use-cases/add-user/add-user.service';
import { HttpRequest } from 'src/presentation/http';
import { PATHS } from 'src/presentation/routes';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { UpdateUserByIdUseCaseService } from './services/use-cases/update-user-by-id/update-user-by-id.service';
import { LoadUsersUseCaseService } from './services/use-cases/load-users/load-users.service';
import { validate } from 'uuid';
import { Hybrid } from 'src/presentation/decorators/public.decorator';
@Controller(PATHS['/users'])
export class UsersController {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.USECASES.ADD)
    private readonly userUserUseCaseService: AddUserUseCaseService,
    @Inject(PROVIDER_KEYS.USER.SERVICES.USECASES.UPDATE_BY_ID)
    private readonly updateUserByIdUseCaseService: UpdateUserByIdUseCaseService,
    @Inject(PROVIDER_KEYS.USER.SERVICES.USECASES.LOAD)
    private readonly loadUsersUseCaseService: LoadUsersUseCaseService,
  ) {}

  @Get()
  async getUsers(@Req() request: HttpRequest): Promise<UserModel[]> {
    if (!request.user)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return await this.loadUsersUseCaseService.loadUser(request.user);
  }

  @Hybrid()
  @Post()
  async addUser(
    @Req() request: HttpRequest,
    @Body() data: AddUserModel,
  ): Promise<UserModel> {
    return await this.userUserUseCaseService.addUser(data, request.user);
  }

  @Put(':id')
  async updateUserById(
    @Req() request: HttpRequest,
    @Param() params: { id: string },
    @Body() data: UpdateUserModel,
  ) {
    if (!request.user)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (!params?.id)
      throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);

    if (!validate(params.id))
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

    return await this.updateUserByIdUseCaseService.updateUserById(
      params.id,
      data,
      request.user,
    );
  }
}
