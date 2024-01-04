import { Repository } from 'typeorm';
import { Note } from '../../entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNoteDto } from './update.dto';
import { BadRequestException } from '@nestjs/common';

export class UpdtateNoteCommand {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async run(id: number, dto: UpdateNoteDto, userId: number) {
    const note = await this.noteRepository.findOneBy({
      id,
      userId,
    });

    if (note === null) {
      throw new BadRequestException(
        'Note is either not found or You are not the creator of this note',
      );
    }

    this.noteRepository.merge(note, dto);

    return await this.noteRepository.save(note);
  }
}
