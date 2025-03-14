import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Public } from '../../presentation/decorators/public.decorator';
import { AuthService } from './auth.service';
import { PATHS } from 'src/presentation/routes';
import { HttpRequest } from 'src/presentation/http';
import { AuthLoginModel } from './interfaces/auth';

@Controller(PATHS['/auth'])
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() data: AuthLoginModel) {
    return this.authService.signIn(data);
  }

  @Get()
  getProfile(@Req() req: HttpRequest) {
    return req.user;
  }
}
