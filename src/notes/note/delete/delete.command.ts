import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Note } from 'src/notes/entities/note.entity';

export class DeleteNoteCommand {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async run(id: number, userId: number) {
    const note = await this.noteRepository.findOneBy({ id, userId });

    if (note === null) {
      throw new NotFoundException(`Note not found`);
    }

    await this.noteRepository.delete(id);

    return { message: 'Note Deleted successfully' };
  }
}
