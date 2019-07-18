import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';

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
  })
  status: TaskStatus;
}
