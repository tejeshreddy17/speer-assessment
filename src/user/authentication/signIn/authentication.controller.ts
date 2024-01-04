import { ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserQuery } from './authentication.query';
import { AuthenticateUserDto } from './authentication.dto';
import { Public } from '../decorator/public.decorator';

@Controller('api/auth/login')
export class AuthenticateUserController {
  constructor(private readonly query: AuthenticateUserQuery) {}

  @Public()
  @Post()
  async create(@Body() dto: AuthenticateUserDto) {
    return await this.query.run(dto);
  }
}
