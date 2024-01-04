import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateNoteCommand } from './create.command';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateNoteDto } from './create.dto';
import { GetTokenPayload } from 'src/user/authentication/decorator/payload.decorator';

@ApiBearerAuth()
@Controller('api/notes')
export class CreateNoteController {
  constructor(private readonly command: CreateNoteCommand) {}

  @Post()
  async create(@Body() dto: CreateNoteDto, @GetTokenPayload() payload) {
    const note = await this.command.run(dto, payload.id);
    return note;
  }
}
