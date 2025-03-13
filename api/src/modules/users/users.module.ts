import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserUseCasesModule } from './services/use-cases/users-use-cases.module';

@Module({
  imports: [UserUseCasesModule],
  controllers: [UsersController],
})
export class UserModule {}
