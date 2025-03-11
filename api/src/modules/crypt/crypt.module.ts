import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';
import { CRYPT_CONSTS } from './constants';

@Module({
  exports: [
    {
      provide: CRYPT_CONSTS['service'],
      useClass: CryptService,
    },
  ],
})
export class CryptModule {}
