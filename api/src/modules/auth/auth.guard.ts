import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import {
  IS_HYBRID,
  IS_PUBLIC_KEY,
} from '../../presentation/decorators/public.decorator';
import { HttpRequest, UserPayload } from 'src/presentation/http';
import { UserRepositoryService } from '../users/services/repository/users-repository.service';
import { PROVIDER_KEYS } from 'src/utils/constants/provider-keys';

const ACCEPT_AUTHORIZATION_HEADER_TYPE = 'Bearer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(PROVIDER_KEYS.USER.SERVICES.REPO.SERVICE)
    private userRepository: UserRepositoryService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isHybrid = this.reflector.getAllAndOverride<boolean>(IS_HYBRID, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request: HttpRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token && isHybrid) return true;
    else if (!token) throw new UnauthorizedException('User unauthorized');

    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findById(payload.id);

      if (!user)
        throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);

      Reflect.deleteProperty(user, 'password');
      request['user'] = user;
    } catch {
      throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromHeader(request: HttpRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === ACCEPT_AUTHORIZATION_HEADER_TYPE ? token : undefined;
  }
}
