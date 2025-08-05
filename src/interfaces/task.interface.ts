export type TaskStatus = 'open' | 'in-progress' | 'done';
export interface Task {
    title: string;
    id: string;
    status: TaskStatus;
}

