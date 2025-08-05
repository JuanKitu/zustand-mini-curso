import type {Task, TaskStatus} from "../../interfaces";
import {create, StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {v4 as uuidv4} from "uuid";
interface TaskState {
    draggingTaskId?: string;
    tasks: Record<string, Task>;
}
interface Actions {
    getTaskByStatus: (status:TaskStatus) => Task[];
    setDraggingTaskId: (taskId:string) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (taskId:string, status:TaskStatus) => void;
    onTaskDrop: (status:TaskStatus) => void;
    addTask: (title: string, status: TaskStatus) => void;
}
type TaskStore = TaskState & Actions;
const storeAPI: StateCreator<TaskStore> = (set,get) => ({
    draggingTaskId: undefined,
    tasks: {
        'ABC-1': {id: 'ABC-1', title: 'Tarea 1', status: 'open'},
        'ABC-2': {id: 'ABC-2', title: 'Tarea 2', status: 'in-progress'},
        'ABC-3': {id: 'ABC-3', title: 'Tarea 3', status: 'open'},
        'ABC-4': {id: 'ABC-4', title: 'Tarea 4', status: 'open'},
    },
    getTaskByStatus: (status:TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(task => task.status === status);
    },
    setDraggingTaskId: (taskId:string) => set({ draggingTaskId: taskId }),
    removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
    changeTaskStatus: (taskId:string, status:TaskStatus) => {
        const task = get().tasks[taskId];
        task.status = status;
        set((state) =>({
            tasks: {...state.tasks, [taskId]: task}
        }))
    },
    onTaskDrop: (status)=>{
        const taskId = get().draggingTaskId;
        if(!taskId) return;
        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    },
    addTask:(title, status) => {
        const newTask = {id: uuidv4(), title, status};
        set((state) => ({
            tasks: {...state.tasks, [newTask.id]: newTask}
        }))
    }
});

export const useTaskStore = create<TaskStore>()(
    devtools(
        persist(
            storeAPI,
            {
                name: 'task-store',
            }
        )
    )
);