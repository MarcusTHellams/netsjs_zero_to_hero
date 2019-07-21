import { User } from './../auth/user.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  async getTasks(filterDto: GetTasksFilterDto, user:User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (e) {
      this.logger.error(`Failed to get tasks for ${user.username}. DTO: ${JSON.stringify(filterDto)}`,e.stack);
      throw new InternalServerErrorException();
   }
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const task = await this.create({
      ...createTaskDTO,
      user,
    });

    
    await task.save();
    delete task.user;
    return task;
  }

  async deleteTask(id: number, user:User): Promise<void> {
    const result = await this.delete({id, userId:user.id});
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
