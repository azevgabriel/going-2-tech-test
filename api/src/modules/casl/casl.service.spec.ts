import { Users } from 'src/modules/users/services/repository/typeorm/users.entity';
import { UserModel } from '../users/interface/user';
import { Action, CaslAbilityService } from './casl.service';

describe('CaslAbilityService', () => {
  let caslAbilityService: CaslAbilityService;

  beforeEach(() => {
    caslAbilityService = new CaslAbilityService();
  });

  it('should allow a user to add a user with role "user"', () => {
    const user: Omit<UserModel, 'password'> = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const ability = caslAbilityService.createForUser(user);

    const targetUser = new Users();
    targetUser.role = 'user';

    expect(ability.can(Action.Add, targetUser)).toBe(true);

    targetUser.role = 'admin';
    expect(ability.can(Action.Add, targetUser)).toBe(false);
  });

  it('should allow a manager to load many users and delete users with role "user"', () => {
    const manager: Omit<UserModel, 'password'> = {
      id: '2',
      name: 'Manager User',
      email: 'manager@example.com',
      role: 'manager',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const ability = caslAbilityService.createForUser(manager);

    const targetUser = new Users();
    targetUser.id = '3'; // ID de outro usuário
    targetUser.role = 'user';

    expect(ability.can(Action.LoadMany, Users)).toBe(true);
    expect(ability.can(Action.Delete, targetUser)).toBe(true);

    targetUser.role = 'admin';
    expect(ability.can(Action.Delete, targetUser)).toBe(false);
  });

  it('should permissions be based on manager role', () => {
    const manager: Omit<UserModel, 'password'> = {
      id: '2',
      name: 'Manager User',
      email: 'manager@example.com',
      role: 'manager',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const ability = caslAbilityService.createForUser(manager);

    const targetUser = new Users();
    targetUser.id = manager.id; // Atualizando o próprio usuário

    expect(ability.can(Action.Update, targetUser)).toBe(true);

    targetUser.id = '3'; // Atualizando outro usuário
    expect(ability.can(Action.Update, targetUser)).toBe(true);

    targetUser.role = 'admin'; // Tentando atualizar a role
    expect(ability.can(Action.Update, targetUser)).toBe(false);
  });

  it('should permissions be based on admin role', () => {
    const admin: Omit<UserModel, 'password'> = {
      id: '3',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const ability = caslAbilityService.createForUser(admin);

    const targetUser = new Users();
    targetUser.id = '4';

    expect(ability.can(Action.Add, targetUser)).toBe(true);
    expect(ability.can(Action.LoadMany, targetUser)).toBe(true);
    expect(ability.can(Action.Update, targetUser)).toBe(true);
    expect(ability.can(Action.Delete, targetUser)).toBe(true);
  });

  it('should permissions be based on user role', () => {
    const user: Omit<UserModel, 'password'> = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const ability = caslAbilityService.createForUser(user);

    const targetUser = new Users();

    targetUser.id = '2'; // Outro usuário
    expect(ability.can(Action.Delete, targetUser)).toBe(false);

    targetUser.id = user.id; // O próprio usuário
    expect(ability.can(Action.Delete, targetUser)).toBe(true);

    targetUser.role = 'admin';
    expect(ability.can(Action.Update, targetUser)).toBe(false);
  });
});
