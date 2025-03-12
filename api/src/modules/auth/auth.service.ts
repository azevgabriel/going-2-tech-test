import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from '../users/services/repository/users-repository.service';
import { USER_CONSTS } from '../users/constants';
import { CRYPT_CONSTS } from '../crypt/constants';
import { CryptService } from '../crypt/crypt.service';
import { UserPayload } from 'src/presentation/http';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_CONSTS['services']['repository']['service'])
    private userRepository: UserRepositoryService,
    private jwtService: JwtService,
    @Inject(CRYPT_CONSTS['service'])
    private cryptService: CryptService,
  ) {}

  async signIn(data: { email: string; password: string }) {
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
