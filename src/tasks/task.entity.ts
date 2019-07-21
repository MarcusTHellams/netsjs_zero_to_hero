import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'title',
    length: 255,
  })
  title: string;

  @Column('varchar', {
    name: 'description',
    length: 255,
  })
  description: string;

  @Column('enum', {
    name: 'status',
    enum: [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN],
    default: TaskStatus.OPEN
  })
  status: TaskStatus;

  @ManyToOne(type => User, User => User.tasks, { eager: false })
  @JoinColumn({name:'userId'})
  user: User;

  @Column('int', {
    name: 'userId'
  })
  userId: number;
}
