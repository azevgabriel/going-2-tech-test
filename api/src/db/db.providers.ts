import { TypeORMDataSource } from './typeorm';
import { TYPE_ORM_PROVIDER_KEY } from './typeorm/constants';

export const databaseProviders = [
  {
    provide: TYPE_ORM_PROVIDER_KEY,
    useFactory: async () => {
      return TypeORMDataSource.initialize();
    },
  },
];
