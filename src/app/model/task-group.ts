import { Task } from "./task";

export interface TaskGroup {
    id: number;
    name: string;
    store: string;
    tasks: Task[];
}
