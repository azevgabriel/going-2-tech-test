import { Injectable, Inject } from '@nestjs/common';
import { CryptService } from 'src/modules/crypt/crypt.service';
import { USER_CONSTS } from 'src/modules/users/constants';
import { AddUserModel, UserModel } from 'src/modules/users/interface/user';
import { CRYPT_CONSTS } from 'src/modules/crypt/constants';
import { UserRepositoryService } from '../../repository/users-repository.service';

@Injectable()
export class AddUserUseCaseService {
  constructor(
    @Inject(USER_CONSTS['services']['repository']['service'])
    private userRepository: UserRepositoryService,
    @Inject(CRYPT_CONSTS['service'])
    private cryptService: CryptService,
  ) {}

  async addUser(user: AddUserModel): Promise<UserModel> {
    const { password } = user;

    const encryptedPassword = await this.cryptService.encrypt(password);

    return await this.userRepository.create({
      ...user,
      password: encryptedPassword,
    });
  }
}
