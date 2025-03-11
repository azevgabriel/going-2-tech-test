import { CRYPT_CONSTS } from 'src/modules/crypt/constants';
import { CryptService } from 'src/modules/crypt/crypt.service';

export const userUseCasesProviders = [
  {
    provide: CRYPT_CONSTS['service'],
    useFactory: () => new CryptService(),
  },
];
