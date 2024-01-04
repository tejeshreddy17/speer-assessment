import { ILike, Repository } from 'typeorm';
import { Note } from '../../entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class SearchNoteQuery {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async run(query: string) {
    const keyWords = query.split(' ');

    const queryOrm = keyWords.map((keyWord) => {
      return {
        content: ILike(`%${keyWord}%`),
      };
    });

    const notes = await this.noteRepository.find({
      where: [...queryOrm],
    });

    return notes;
  }
}
