import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { UserRepositoryModule } from 'src/modules/users/services/repository/users-repository.module';

@Module({
  imports: [UserRepositoryModule],
  providers: [
    {
      provide: 'CASL_ABILITY_FACTORY',
      useClass: CaslAbilityFactory,
    },
  ],
  exports: [
    {
      provide: 'CASL_ABILITY_FACTORY',
      useClass: CaslAbilityFactory,
    },
  ],
})
export class CaslModule {}
