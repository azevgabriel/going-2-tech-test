import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from '../users/services/repository/users-repository.service';
import { CryptService } from '../crypt/crypt.service';
import { UserPayload } from 'src/presentation/http';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';
import { AuthLoginModel } from './interfaces/auth';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.REPO.SERVICE)
    private userRepository: UserRepositoryService,
    @Inject(PROVIDER_KEYS.CRYPT.SERVICE)
    private cryptService: CryptService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: AuthLoginModel) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new UnauthorizedException();

    const { password, ...userWithoutPassword } = user;

    const matchPassword = await this.cryptService.compare(
      data.password,
      password,
    );

    if (!matchPassword) throw new UnauthorizedException();

    const payload: UserPayload = {
      id: userWithoutPassword?.id,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: userWithoutPassword,
    };
  }
}
