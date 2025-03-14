import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  MongoQuery,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Users } from 'src/modules/users/services/repository/typeorm/users.entity';
import { UserModel } from '../users/interface/user';

export enum Action {
  Add = 'add',
  LoadMany = 'load_many',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof Users> | 'all';
type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityService {
  constructor() {}

  createForUser(user: Omit<UserModel, 'password'>) {
    const { can, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>,
    );

    can(Action.Update, Users, { id: user.id, role: undefined });
    can(Action.Add, Users, { role: 'user' });
    can(Action.Delete, Users, { id: user.id });

    if (user.role === 'manager') {
      can(Action.LoadMany, Users);
      can(Action.Update, Users, { role: undefined });
      can(Action.Delete, Users, { role: 'user' });
    }

    if (user.role === 'admin') {
      can([Action.LoadMany, Action.Update, Action.Add, Action.Delete], 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
