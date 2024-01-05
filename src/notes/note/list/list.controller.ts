import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GetTokenPayload } from 'src/user/authentication/decorator/payload.decorator';
import { ListNotesQuery } from './list.query';

@ApiBearerAuth()
@Controller('api/notes')
export class ListNotesController {
  constructor(private readonly query: ListNotesQuery) {}

  @Get()
  async list(@GetTokenPayload() payload) {
    const note = await this.query.run(payload.id);
    return note;
  }
}
