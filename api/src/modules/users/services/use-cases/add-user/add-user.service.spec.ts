/* eslint-disable @typescript-eslint/unbound-method */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Action, CaslAbilityService } from 'src/modules/casl/casl.service';
import { CryptService } from 'src/modules/crypt/crypt.service';
import { AddUserModel } from 'src/modules/users/interface/user';
import { Users } from '../../repository/typeorm/users.entity';
import { UserRepositoryService } from '../../repository/users-repository.service';
import { AddUserUseCaseService } from './add-user.service';

describe('AddUserUseCaseService', () => {
  let service: AddUserUseCaseService;
  let userRepository: jest.Mocked<UserRepositoryService>;
  let cryptService: jest.Mocked<CryptService>;
  let caslAbilityService: jest.Mocked<CaslAbilityService>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryService>;

    cryptService = {
      encrypt: jest.fn(),
    } as unknown as jest.Mocked<CryptService>;

    caslAbilityService = {
      createForUser: jest.fn(),
    } as unknown as jest.Mocked<CaslAbilityService>;

    service = new AddUserUseCaseService(
      userRepository,
      cryptService,
      caslAbilityService,
    );
  });

  it('should create a user successfully', async () => {
    const mockUser = new Users();
    const mockData: AddUserModel = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
    };
    const encryptedPassword = 'encryptedPassword';

    userRepository.findByEmail.mockResolvedValue(null);
    cryptService.encrypt.mockResolvedValue(encryptedPassword);
    userRepository.create.mockResolvedValue(mockUser);

    const result = await service.addUser(mockData);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockData.email);
    expect(cryptService.encrypt).toHaveBeenCalledWith(mockData.password);
    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: mockData.name,
        email: mockData.email,
        password: encryptedPassword,
        role: mockData.role,
      }),
    );
    expect(result).toBe(mockUser);
  });

  it('should throw an error if email is already in use', async () => {
    const mockData: AddUserModel = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
    };

    userRepository.findByEmail.mockResolvedValue(new Users());

    await expect(service.addUser(mockData)).rejects.toThrow(
      new HttpException('Email already in use', HttpStatus.BAD_REQUEST),
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockData.email);
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if user does not have permission', async () => {
    const mockData: AddUserModel = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'admin',
    };
    const mockRequestUser: any = {
      id: '123',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'user',
    };
    const mockAbility = {
      can: jest.fn().mockReturnValue(false),
    };

    userRepository.findByEmail.mockResolvedValue(null);
    caslAbilityService.createForUser.mockReturnValue(mockAbility as any);

    await expect(service.addUser(mockData, mockRequestUser)).rejects.toThrow(
      new HttpException(
        'User does not have permission for this action',
        HttpStatus.FORBIDDEN,
      ),
    );

    expect(caslAbilityService.createForUser).toHaveBeenCalledWith(
      mockRequestUser,
    );
    expect(mockAbility.can).toHaveBeenCalledWith(Action.Add, expect.any(Users));
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
