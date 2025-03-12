import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepositoryModule } from './services/repository/users-repository.module';
import { UserUseCasesModule } from './services/use-cases/users-use-cases.module';
import { CaslModule } from 'src/modules/casl/casl.module';

@Module({
  imports: [UserRepositoryModule, UserUseCasesModule, CaslModule],
  controllers: [UsersController],
})
export class UserModule {}
