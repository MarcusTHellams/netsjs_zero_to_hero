import { TaskStatus } from "../task-status.enum";

export class GetTasksFilterDto {
    readonly status: TaskStatus;
    readonly search: string;
}