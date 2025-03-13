import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { CryptService } from './crypt.service';

export const cryptProvider = {
  provide: PROVIDER_KEYS.CRYPT.SERVICE,
  useClass: CryptService,
};
