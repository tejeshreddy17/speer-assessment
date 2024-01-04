import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GetTokenPayload } from 'src/user/authentication/decorator/payload.decorator';
import { DeleteNoteCommand } from './delete.command';

@ApiBearerAuth()
@Controller('api/notes')
export class DeleteNoteController {
  constructor(private readonly command: DeleteNoteCommand) {}

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetTokenPayload() payload,
  ) {
    return await this.command.run(id, payload.id);
  }
}
