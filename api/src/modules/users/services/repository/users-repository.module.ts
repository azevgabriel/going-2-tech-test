import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Users } from './typeorm/users.entity';
import { DatabaseModule } from 'src/db/db.module';
import { userRepositoryProvider } from './users-repository.provider';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';

@Module({
  imports: [DatabaseModule],
  exports: [userRepositoryProvider],
  providers: [
    userRepositoryProvider,
    {
      provide: PROVIDER_KEYS.USER.SERVICES.REPO.DB_USER_INSTANCE,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
      inject: [PROVIDER_KEYS.TYPE_ORM.SERVICE],
    },
  ],
})
export class UserRepositoryModule {}
