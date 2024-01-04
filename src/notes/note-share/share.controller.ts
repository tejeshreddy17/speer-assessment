import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GetTokenPayload } from 'src/user/authentication/decorator/payload.decorator';
import { ShareNoteCommand } from './share.command';

@ApiBearerAuth()
@Controller('api/notes')
export class ShareNoteController {
  constructor(private readonly command: ShareNoteCommand) {}

  @Post(':id/share/:userId')
  async list(
    @Param('id', ParseIntPipe) noteId: number,
    @Param('userId', ParseIntPipe) toSharedUserId: number,
    @GetTokenPayload() payload,
  ) {
    return await this.command.run(noteId, toSharedUserId, payload.id);
  }
}
