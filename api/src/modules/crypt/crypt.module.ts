import { Module } from '@nestjs/common';
import { cryptProvider } from './crypt.provider';

@Module({
  exports: [cryptProvider],
  providers: [cryptProvider],
})
export class CryptModule {}
