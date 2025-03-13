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
    user: AddUserModel,
    requestUser: Omit<UserModel, 'password'>,
  ): Promise<UserModel> {
    const ability = this.caslAbilityService.createForUser(requestUser);

    if (!ability.can(Action.Add, Users))
      throw new HttpException(
        'User does not have permission for this action',
        HttpStatus.FORBIDDEN,
      );

    const { password, email } = user;

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const encryptedPassword = await this.cryptService.encrypt(password);

    return await this.userRepository.create({
      ...user,
      password: encryptedPassword,
    });
  }
}
