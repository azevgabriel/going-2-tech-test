import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { USER_CONSTS } from '../../constants';
import { TYPE_ORM_PROVIDER_KEY } from 'src/db/typeorm/constants';

export const userProviders = [
  {
    provide: USER_CONSTS['repository'],
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [TYPE_ORM_PROVIDER_KEY],
  },
];
