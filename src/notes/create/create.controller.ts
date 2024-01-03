import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateNoteCommand } from './create.command';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateNoteDto } from './create.dto';

@ApiBearerAuth()
@Controller('api/notes')
export class ConsultationNoteController {
  constructor(private readonly command: CreateNoteCommand) {}

  @Post()
  async create(@Body() dto: CreateNoteDto) {
    const note = await this.command.run(dto, 1);
    return note;
  }
}
