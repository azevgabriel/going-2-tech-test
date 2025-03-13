import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { LoadUsersUseCaseService } from './load-users.service';

export const loadUsersUseCaseProvider = {
  provide: PROVIDER_KEYS.USER.SERVICES.USECASES.LOAD,
  useClass: LoadUsersUseCaseService,
};
