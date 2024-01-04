import { ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserCommand } from './signUp.command';
import { CreateRegisterUserDto } from './signUp.dto';
import { Public } from '../authentication/decorator/public.decorator';

@ApiBearerAuth()
@Controller('/api/auth/signup')
export class CreateUserController {
  constructor(private readonly command: CreateUserCommand) {}

  @Public()
  @Post()
  async create(@Body() dto: CreateRegisterUserDto) {
    return await this.command.run(dto);
  }
}
