import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { UserRepositoryService } from '../../repository/users-repository.service';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UpdateUserModel, UserModel } from 'src/modules/users/interface/user';
import { Users } from '../../repository/typeorm/users.entity';
import { Action, CaslAbilityService } from 'src/modules/casl/casl.service';
import { CryptService } from 'src/modules/crypt/crypt.service';

export class UpdateUserByIdUseCaseService {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.REPO.SERVICE)
    private userRepository: UserRepositoryService,
    @Inject(PROVIDER_KEYS.CRYPT.SERVICE)
    private cryptService: CryptService,
    @Inject(PROVIDER_KEYS.CASL.SERVICE)
    private readonly caslAbilityService: CaslAbilityService,
  ) {}

  async updateUserById(
    id: string,
    data: UpdateUserModel,
    requestUser: Omit<UserModel, 'password'>,
  ) {
    const { email, name, role, password } = data;

    const user = await this.userRepository.findById(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const partialUserUpdate = new Users();

    if (user) partialUserUpdate.id = user.id;
    if (email) partialUserUpdate.email = email;
    if (name) partialUserUpdate.name = name;
    if (role) partialUserUpdate.role = role;

    if (password)
      partialUserUpdate.password = await this.cryptService.encrypt(password);

    const ability = this.caslAbilityService.createForUser(requestUser);

    if (ability.can(Action.Update, partialUserUpdate)) {
      Reflect.deleteProperty(partialUserUpdate, id);
      return await this.userRepository.updateById(user.id, data);
    }

    throw new HttpException(
      'User does not have permission for this action',
      HttpStatus.FORBIDDEN,
    );
  }
}
