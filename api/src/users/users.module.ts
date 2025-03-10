import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { DatabaseModule } from 'src/db/db.module';
import { UserRepositoryService } from './repository/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserRepositoryService],
})
export class UserModule {}
