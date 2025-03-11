import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repository/users-repository.module';
import { CryptModule } from 'src/modules/crypt/crypt.module';
import { addUserUseCaseProvider } from './add-user/add-user.provider';

@Module({
  imports: [UserRepositoryModule, CryptModule],
  providers: [addUserUseCaseProvider],
  exports: [addUserUseCaseProvider],
})
export class UserUseCasesModule {}
