import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Action, CaslAbilityService } from 'src/modules/casl/casl.service';
import { UserModel } from 'src/modules/users/interface/user';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { Users } from '../../repository/typeorm/users.entity';
import { UserRepositoryService } from '../../repository/users-repository.service';

@Injectable()
export class DeleteUserByIdUseCaseService {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.REPO.SERVICE)
    private userRepository: UserRepositoryService,
    @Inject(PROVIDER_KEYS.CASL.SERVICE)
    private readonly caslAbilityService: CaslAbilityService,
  ) {}

  async deleteById(
    id: string,
    requestUser: Omit<UserModel, 'password'>,
  ): Promise<void> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const user = new Users();

    user.id = id;
    user.role = userExists.role;

    const ability = this.caslAbilityService.createForUser(requestUser);

    if (!ability.can(Action.Delete, user))
      throw new HttpException(
        'User does not have permission for this action',
        HttpStatus.FORBIDDEN,
      );

    await this.userRepository.deleteById(id);
  }
}
