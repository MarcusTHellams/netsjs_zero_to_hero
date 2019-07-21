import { User } from 'src/auth/user.entity';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) { }
    

  async getTaskById(id: number, user:User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: {id, userId: user.id}});
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDTO, user);
  }

    async getTasks(filterDTO: GetTasksFilterDto, user:User):Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDTO, user);
     }

    
    async updateTaskStatus(id: number, status: TaskStatus,user: User): Promise<Task>{
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
  


    deleteTaskById(id: number, user:User): Promise<void> {
        return this.taskRepository.deleteTask(id, user);
    }

}
