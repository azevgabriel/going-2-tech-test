import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { UserRepositoryService } from './users-repository.service';
import { Provider } from '@nestjs/common';

export const userRepositoryProvider: Provider = {
  provide: PROVIDER_KEYS.USER.SERVICES.REPO.SERVICE,
  useClass: UserRepositoryService,
};
