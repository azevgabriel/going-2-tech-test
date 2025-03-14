import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { HttpRequest } from 'src/presentation/http';
import { PATHS } from 'src/presentation/routes';
import { Public } from '../../presentation/decorators/public.decorator';
import { AuthService } from './auth.service';
import { AuthLoginModel } from './interfaces/auth';

@Controller(PATHS['/auth'])
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() data: AuthLoginModel) {
    if (!data || !data.email || !data.password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.authService.signIn(data);
  }

  @Get()
  getProfile(@Req() req: HttpRequest) {
    return req.user;
  }
}
