import { CRYPT_CONSTS } from './constants';
import { CryptService } from './crypt.service';

export const cryptProvider = {
  provide: CRYPT_CONSTS['service'],
  useClass: CryptService,
};
