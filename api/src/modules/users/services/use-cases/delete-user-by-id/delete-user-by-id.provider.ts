import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { DeleteUserByIdUseCaseService } from './delete-user-by-id.service';

export const deleteUserByIdUseCaseProvider = {
  provide: PROVIDER_KEYS.USER.SERVICES.USECASES.DELETE_BY_ID,
  useClass: DeleteUserByIdUseCaseService,
};
