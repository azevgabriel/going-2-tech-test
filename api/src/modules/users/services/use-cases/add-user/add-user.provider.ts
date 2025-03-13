import { AddUserUseCaseService } from './add-user.service';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';

export const addUserUseCaseProvider = {
  provide: PROVIDER_KEYS.USER.SERVICES.USECASES.ADD,
  useClass: AddUserUseCaseService,
};
