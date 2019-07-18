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
    

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDTO);
  }

    async getTasks(filterDTO: GetTasksFilterDto):Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDTO);
     }

    
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
  


    deleteTaskById(id: number): Promise<void> {
        return this.taskRepository.deleteTask(id);
    }

}
