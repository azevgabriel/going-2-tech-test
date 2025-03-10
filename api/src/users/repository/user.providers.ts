import { DataSource } from 'typeorm';
import { User } from './typeorm/user.entity';
import { USER_CONSTS } from '../constants';
import { TYPE_ORM_PROVIDER_KEY } from 'src/db/typeorm/constants';

export const userProviders = [
  {
    provide: USER_CONSTS.get('user'),
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [TYPE_ORM_PROVIDER_KEY],
  },
];
