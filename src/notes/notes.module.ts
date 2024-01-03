import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as controllers from './index.controllers';
import { CreateNoteCommand } from './create/create.command';
import { Note } from './entities/note.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [...Object.values(controllers)],
  providers: [CreateNoteCommand],
})
export class noteModule {}
