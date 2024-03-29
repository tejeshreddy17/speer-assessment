import { Repository } from 'typeorm';
import { CreateNoteDto } from './create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/notes/entities/note.entity';

export class CreateNoteCommand {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async run(dto: CreateNoteDto, loggedInUserId: number) {
    const note = this.noteRepository.create({ ...dto, userId: loggedInUserId });

    const savedNote = await this.noteRepository.save(note);

    return savedNote;
  }
}
