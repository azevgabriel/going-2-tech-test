import { Module } from '@nestjs/common';
import { caslProvider } from './casl.provider';

@Module({
  imports: [],
  providers: [caslProvider],
  exports: [caslProvider],
})
export class CaslModule {}
