import { Module } from '@nestjs/common';
import { CaslModule } from 'src/modules/casl/casl.module';
import { CryptModule } from 'src/modules/crypt/crypt.module';
import { UserRepositoryModule } from '../repository/users-repository.module';
import { addUserUseCaseProvider } from './add-user/add-user.provider';
import { deleteUserByIdUseCaseProvider } from './delete-user-by-id/delete-user-by-id.provider';
import { loadUsersUseCaseProvider } from './load-users/load-users.provider';
import { updateUserByIdUseCaseProvider } from './update-user-by-id/update-user-by-id.provider';

@Module({
  imports: [UserRepositoryModule, CryptModule, CaslModule],
  providers: [
    addUserUseCaseProvider,
    updateUserByIdUseCaseProvider,
    loadUsersUseCaseProvider,
    deleteUserByIdUseCaseProvider,
  ],
  exports: [
    addUserUseCaseProvider,
    updateUserByIdUseCaseProvider,
    loadUsersUseCaseProvider,
    deleteUserByIdUseCaseProvider,
  ],
})
export class UserUseCasesModule {}
