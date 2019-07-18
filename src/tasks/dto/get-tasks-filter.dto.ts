import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
    readonly status: TaskStatus;
    readonly search: string;
}