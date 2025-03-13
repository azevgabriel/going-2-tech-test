import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { UserRepositoryService } from '../../repository/users-repository.service';
import { Action, CaslAbilityService } from 'src/modules/casl/casl.service';
import { Users } from '../../repository/typeorm/users.entity';
import { UserModel } from 'src/modules/users/interface/user';

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
      return await this.userRepository.findAll();

    throw new HttpException(
      'User does not have permission for this action',
      HttpStatus.FORBIDDEN,
    );
  }
}
