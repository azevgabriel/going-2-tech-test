import { DataSource } from 'typeorm';
import { TYPE_ORM_PROVIDER_KEY } from 'src/db/typeorm/constants';
import { USER_CONSTS } from '../../constants';
import { User } from './typeorm/user.entity';

export const userRepositoryProviders = [
  {
    provide: USER_CONSTS['services']['repository'],
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [TYPE_ORM_PROVIDER_KEY],
  },
];
