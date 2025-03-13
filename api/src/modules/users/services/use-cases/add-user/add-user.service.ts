import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CryptService } from 'src/modules/crypt/crypt.service';
import { AddUserModel, UserModel } from 'src/modules/users/interface/user';
import { UserRepositoryService } from '../../repository/users-repository.service';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { Action, CaslAbilityService } from 'src/modules/casl/casl.service';
import { Users } from '../../repository/typeorm/users.entity';

@Injectable()
export class AddUserUseCaseService {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.REPO.SERVICE)
    private userRepository: UserRepositoryService,
    @Inject(PROVIDER_KEYS.CRYPT.SERVICE)
    private cryptService: CryptService,
    @Inject(PROVIDER_KEYS.CASL.SERVICE)
    private readonly caslAbilityService: CaslAbilityService,
  ) {}

  async addUser(
    data: AddUserModel,
    requestUser?: Omit<UserModel, 'password'>,
  ): Promise<UserModel> {
    const user = new Users();

    const {
      name,
      password,
      email,
      role,
      created_by_user_id,
      updated_by_user_id,
    } = data;

    user.name = name;
    user.role = role || 'user';

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists)
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    else user.email = email;

    if (requestUser) {
      const ability = this.caslAbilityService.createForUser(requestUser);

      if (!ability.can(Action.Add, user))
        throw new HttpException(
          'User does not have permission for this action',
          HttpStatus.FORBIDDEN,
        );

      if (created_by_user_id) user.created_by_user_id = requestUser.id;
      if (updated_by_user_id) user.updated_by_user_id = requestUser.id;
    } else user.role = 'user';

    user.password = await this.cryptService.encrypt(password);

    return await this.userRepository.create(user);
  }
}
