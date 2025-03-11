import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/db/db.module';
import { UserRepositoryService } from './services/repository/users-repository.service';
import { userRepositoryProviders } from './services/repository/users-repository.providers';
import { userUseCasesProviders } from './services/use-cases/user-use-cases.providers';
import { AddUserUseCaseService } from './services/use-cases/add-user/add-user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userRepositoryProviders,
    ...userUseCasesProviders,
    UserRepositoryService,
    AddUserUseCaseService,
  ],
})
export class UserModule {}
