import { USER_CONSTS } from '../../constants';
import { UserRepositoryService } from './users-repository.service';

export const userRepositoryProvider = {
  provide: USER_CONSTS['services']['repository']['service'],
  useClass: UserRepositoryService,
};
