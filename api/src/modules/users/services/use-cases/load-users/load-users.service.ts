import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Action, CaslAbilityService } from 'src/modules/casl/casl.service';
import { UserModel } from 'src/modules/users/interface/user';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { Users } from '../../repository/typeorm/users.entity';
import { UserRepositoryService } from '../../repository/users-repository.service';

@Injectable()
export class LoadUsersUseCaseService {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.REPO.SERVICE)
    private userRepository: UserRepositoryService,
    @Inject(PROVIDER_KEYS.CASL.SERVICE)
    private readonly caslAbilityService: CaslAbilityService,
  ) {}

  async loadUser(requestUser: Omit<UserModel, 'password'>) {
    const ability = this.caslAbilityService.createForUser(requestUser);

    if (ability.can(Action.LoadMany, Users))
      return (await this.userRepository.findAll()).map((user) => {
        Reflect.deleteProperty(user, 'password');
        return user;
      });

    throw new HttpException(
      'User does not have permission for this action',
      HttpStatus.FORBIDDEN,
    );
  }
}
