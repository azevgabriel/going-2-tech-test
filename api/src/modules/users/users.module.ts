import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/db/db.module';
import { UserRepositoryModule } from './services/repository/users-repository.module';
import { UserUseCasesModule } from './services/use-cases/users-use-cases.module';

@Module({
  imports: [DatabaseModule, UserRepositoryModule, UserUseCasesModule],
  controllers: [UsersController],
})
export class UserModule {}
