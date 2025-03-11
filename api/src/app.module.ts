import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
