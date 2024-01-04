import { ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { GetTokenPayload } from 'src/user/authentication/decorator/payload.decorator';
import { UpdtateNoteCommand } from './update.command';
import { UpdateNoteDto } from './update.dto';

@ApiBearerAuth()
@Controller('api/notes')
export class UpdtateNoteController {
  constructor(private readonly command: UpdtateNoteCommand) {}

  @Put(':id')
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNoteDto,
    @GetTokenPayload() payload,
  ) {
    const note = await this.command.run(id, dto, payload.id);
    return note;
  }
}
