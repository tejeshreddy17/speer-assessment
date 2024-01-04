import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as controllers from './index.controllers';
import { Note } from './entities/note.entity';
import { GetNoteQuery } from './note/get/get.query';
import { ListNotesQuery } from './note/list/list.query';
import { UpdtateNoteCommand } from './note/update/update.command';
import { SearchNoteQuery } from './note/search/search.query';
import { ShareNoteCommand } from './note-share/share.command';
import { NoteShare } from './entities/note-share.entity';
import { DeleteNoteCommand } from './note/delete/delete.command';
import { CreateNoteCommand } from './note/create/create.command';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Note, NoteShare])],
  controllers: [...Object.values(controllers)],
  providers: [
    CreateNoteCommand,
    GetNoteQuery,
    ListNotesQuery,
    UpdtateNoteCommand,
    DeleteNoteCommand,
    SearchNoteQuery,
    ShareNoteCommand,
  ],
})
export class noteModule {}
