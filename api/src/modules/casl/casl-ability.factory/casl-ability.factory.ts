import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  MongoQuery,
} from '@casl/ability';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { USER_CONSTS } from 'src/modules/users/constants';
import { Users } from 'src/modules/users/services/repository/typeorm/users.entity';
import { UserRepositoryService } from 'src/modules/users/services/repository/users-repository.service';
import { UserPayload } from 'src/presentation/http';

export enum Action {
  Manage = 'manage',
  ReadById = 'read_by_id',
  ReadAll = 'read_all',
  Update = 'update',
}

type Subjects = InferSubjects<typeof Users> | 'all';
type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @Inject(USER_CONSTS['services']['repository']['service'])
    private userRepository: UserRepositoryService,
  ) {}

  async createForUser(userPayload: UserPayload) {
    const user = await this.userRepository.findById(userPayload.id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>,
    );

    can(Action.ReadById, Users);
    cannot(Action.Update, Users, { role: { $exists: true }, id: user.id });

    if (user.role === 'manager') {
      can([Action.ReadAll, Action.Update], Users);
      can([Action.ReadById, Action.Update], Users);
      cannot(Action.Update, Users, { role: { $exists: true } });
    }

    if (user.role === 'admin') can(Action.Manage, 'all');

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
