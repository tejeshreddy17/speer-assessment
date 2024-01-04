import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('index_mailId_userName', ['mailId', 'userName'], {
  unique: true,
})
@Entity('users', { schema: 'speer' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'first_name' })
  firstName: string;

  @Column('text', { name: 'last_name' })
  lastName: string;

  @Column('varchar', { name: 'user_name', length: 200 })
  userName: string;

  @Column('varchar', { name: 'mail_id', length: 200 })
  mailId: string;

  @Column('text', { name: 'crypted_password' })
  cryptedPassword: string;

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
}
