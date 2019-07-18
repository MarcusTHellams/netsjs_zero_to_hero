import { NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Repository, EntityRepository, DeleteResult } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task>{
        const task = await this.create({...createTaskDTO, status: TaskStatus.OPEN});
        return await this.save(task);
    }

    async deleteTask(id:number): Promise<void>{
        const result = await this.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
}