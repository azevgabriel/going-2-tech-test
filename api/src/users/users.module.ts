import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { DatabaseModule } from 'src/db/db.module';
import { PhotoRepositoryService } from './repository/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [PhotoRepositoryService],
})
export class UserModule {}
