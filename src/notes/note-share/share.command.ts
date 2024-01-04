import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteShare } from '../entities/note-share.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ShareNoteCommand {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,

    @InjectRepository(NoteShare)
    private noteShareRepository: Repository<NoteShare>,
  ) {}

  async run(noteId: number, toBeSharedUserId: number, loggedInUserId: number) {
    const note = await this.noteRepository.findOne({
      where: {
        id: noteId,
      },
    });

    if (note === null) {
      throw new NotFoundException('Note is not found');
    }

    const noteShare = this.noteShareRepository.create({
      noteId,
      sharedBy: loggedInUserId,
      sharedTo: toBeSharedUserId,
    });

    await this.noteShareRepository.save(noteShare);

    return { message: `Note shared to user with id ${toBeSharedUserId}` };
  }
}
