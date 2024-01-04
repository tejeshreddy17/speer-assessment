import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GetTokenPayload } from 'src/user/authentication/decorator/payload.decorator';
import { GetNoteQuery } from './get.query';

@ApiBearerAuth()
@Controller('api/notes')
export class GetNoteController {
  constructor(private readonly query: GetNoteQuery) {}

  @Get(':id')
  async Get(@Param('id', ParseIntPipe) id: number, @GetTokenPayload() payload) {
    const note = await this.query.run(id);
    return note;
  }
}
