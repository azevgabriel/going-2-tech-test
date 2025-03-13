import { Provider } from '@nestjs/common';
import { TypeORMDataSource } from './typeorm';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';

export const databaseProviders: Provider[] = [
  {
    provide: PROVIDER_KEYS.TYPE_ORM.SERVICE,
    useFactory: async () => {
      return TypeORMDataSource.initialize();
    },
  },
];
