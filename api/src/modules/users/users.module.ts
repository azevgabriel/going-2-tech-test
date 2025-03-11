import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { DatabaseModule } from 'src/db/db.module';
import { userProviders } from './repository/typeorm/user.providers';
import { UserRepositoryService } from './repository/users-repository.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, UserRepositoryService],
})
export class UserModule {}
