import { CaslAbilityService } from './casl.service';

export const caslProvider = {
  provide: 'CASL_ABILITY_SERVICE',
  useClass: CaslAbilityService,
};
