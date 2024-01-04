import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { GetTokenPayload } from 'src/user/authentication/decorator/payload.decorator';
import { SearchNoteQuery } from './search.query';

@ApiBearerAuth()
@Controller('api/notes/search')
export class SearchNoteController {
  constructor(private readonly query: SearchNoteQuery) {}

  @Get()
  async Search(@Query('q') queryString: string, @GetTokenPayload() payload) {
    const notes = await this.query.run(queryString);
    return notes;
  }
}
