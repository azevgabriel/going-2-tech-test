import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repository/users-repository.module';
import { CryptModule } from 'src/modules/crypt/crypt.module';
import { addUserUseCaseProvider } from './add-user/add-user.provider';
import { updateUserByIdUseCaseProvider } from './update-user-by-id/update-user-by-id.provider';
import { CaslModule } from 'src/modules/casl/casl.module';
import { loadUsersUseCaseProvider } from './load-users/load-users.provider';

@Module({
  imports: [UserRepositoryModule, CryptModule, CaslModule],
  providers: [
    addUserUseCaseProvider,
    updateUserByIdUseCaseProvider,
    loadUsersUseCaseProvider,
  ],
  exports: [
    addUserUseCaseProvider,
    updateUserByIdUseCaseProvider,
    loadUsersUseCaseProvider,
  ],
})
export class UserUseCasesModule {}
