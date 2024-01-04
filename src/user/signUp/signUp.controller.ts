import { ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserCommand } from './signUp.command';
import { CreateRegisterUserDto } from './signUp.dto';

@ApiBearerAuth()
@Controller('/api/auth/signup')
export class ConsultationNoteController {
  constructor(private readonly command: CreateUserCommand) {}

  @Post()
  async create(@Body() dto: CreateRegisterUserDto) {
    return await this.command.run(dto);
  }
}
