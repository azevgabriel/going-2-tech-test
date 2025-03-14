import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Action, CaslAbilityService } from 'src/modules/casl/casl.service';
import { CryptService } from 'src/modules/crypt/crypt.service';
import { UpdateUserModel, UserModel } from 'src/modules/users/interface/user';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { Users } from '../../repository/typeorm/users.entity';
import { UserRepositoryService } from '../../repository/users-repository.service';

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

    if (email) {
      const userExists = await this.userRepository.findByEmail(email);

      if (userExists && userExists.id !== id)
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

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
      const response = await this.userRepository.updateById(user.id, {
        ...data,
        updated_by_user_id: requestUser.id,
        updated_at: new Date(),
      });
      if (response) Reflect.deleteProperty(response, 'password');
      return response;
    }

    throw new HttpException(
      'User does not have permission for this action',
      HttpStatus.FORBIDDEN,
    );
  }
}
