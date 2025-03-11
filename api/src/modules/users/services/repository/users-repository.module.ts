import { Module } from '@nestjs/common';
import { USER_CONSTS } from '../../constants';
import { TYPE_ORM_PROVIDER_KEY } from 'src/db/typeorm/constants';
import { DataSource } from 'typeorm';
import { Users } from './typeorm/users.entity';
import { DatabaseModule } from 'src/db/db.module';
import { userRepositoryProvider } from './users-repository.provider';

@Module({
  imports: [DatabaseModule],
  exports: [userRepositoryProvider],
  providers: [
    userRepositoryProvider,
    {
      provide: USER_CONSTS['services']['repository']['typeorm_db_provider'],
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
      inject: [TYPE_ORM_PROVIDER_KEY],
    },
  ],
})
export class UserRepositoryModule {}
