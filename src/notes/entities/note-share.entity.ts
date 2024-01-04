import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Note } from './note.entity';

@Index('index_noteId_userId', ['noteId', 'sharedTo', 'sharedBy'])
@Entity('note_shares', { schema: 'speer' })
export class NoteShare {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'note_id' })
  noteId: number;

  @Column('int', { name: 'shared_to' })
  sharedTo: number;

  @Column('int', { name: 'shared_by' })
  sharedBy: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setDatesBeforeInsert() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setDateBeforeUpdate() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => Note)
  @JoinColumn({ name: 'note_id', referencedColumnName: 'id' })
  note: Note;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'shared_by', referencedColumnName: 'id' })
  sharedByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'shared_to', referencedColumnName: 'id' })
  sharedToUser: User;
}
