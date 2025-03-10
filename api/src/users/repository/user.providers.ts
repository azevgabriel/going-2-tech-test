import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { USER_CONSTS } from '../constants';

export const userProviders = [
  {
    provide: USER_CONSTS.get('user'),
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
