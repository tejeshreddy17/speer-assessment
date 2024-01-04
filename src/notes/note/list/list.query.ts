import { In, Repository } from 'typeorm';
import { Note } from '../../entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteShare } from '../../entities/note-share.entity';

export class ListNotesQuery {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,

    @InjectRepository(NoteShare)
    private noteShareRepository: Repository<NoteShare>,
  ) {}

  async run(userId: number) {
    // check for any note shares for this user
    const noteShares = await this.noteShareRepository.findBy({
      sharedTo: userId,
    });

    const noteIds = noteShares.map((noteShare) => noteShare.noteId);

    const notes = await this.noteRepository.find({
      where: [
        {
          userId,
        },
        {
          id: In(noteIds),
        },
      ],
    });

    return notes;
  }
}
