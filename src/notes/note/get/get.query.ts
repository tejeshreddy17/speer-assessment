import { Repository } from 'typeorm';
import { Note } from '../../entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class GetNoteQuery {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async run(id: number) {
    const note = await this.noteRepository.findOne({
      where: {
        id,
      },
    });

    return note;
  }
}
