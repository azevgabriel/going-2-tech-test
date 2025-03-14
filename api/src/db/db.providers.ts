import { Provider } from '@nestjs/common';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { TypeORMDataSource } from './typeorm';

export const databaseProviders: Provider[] = [
  {
    provide: PROVIDER_KEYS.TYPE_ORM.SERVICE,
    useFactory: async () => {
      if (!TypeORMDataSource.isInitialized)
        return TypeORMDataSource.initialize();
      return TypeORMDataSource;
    },
  },
];
