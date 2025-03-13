import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { UpdateUserByIdUseCaseService } from './update-user-by-id.service';
import { Provider } from '@nestjs/common';

export const updateUserByIdUseCaseProvider: Provider = {
  provide: PROVIDER_KEYS.USER.SERVICES.USECASES.UPDATE_BY_ID,
  useClass: UpdateUserByIdUseCaseService,
};
