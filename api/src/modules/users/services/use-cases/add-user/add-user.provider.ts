import { USER_CONSTS } from 'src/modules/users/constants';
import { AddUserUseCaseService } from './add-user.service';

export const addUserUseCaseProvider = {
  provide: USER_CONSTS['services']['useCases']['add'],
  useClass: AddUserUseCaseService,
};
