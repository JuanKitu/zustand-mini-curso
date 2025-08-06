import {useTaskStore} from "../stores";
import {DragEvent, useState} from "react";
import {useShallow} from "zustand/react/shallow";
import Swal from "sweetalert2";
import {TaskStatus} from "../interfaces";
interface Options {
    status:TaskStatus;
}
export function UseTasks({status}: Options) {
    const isDragging = useTaskStore(state => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore(state => state.onTaskDrop);
    const [onDragOver, setOnDragOver] = useState(false);
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(true);
    }
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(false);
    }
    const handleDragDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status)
    }
    const addTask = useTaskStore( useShallow( state => state.addTask ) );
    const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
            title: 'Nueva Tarea',
            input: 'text',
            inputLabel: 'Nombre de la tarea',
            inputPlaceholder: 'Ingresa el nombre de la tarea',
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            inputValidator: (status) => {
                if (!status) {
                    return 'Debes ingresar un nombre de tarea'
                }
            }
        });
        if (!isConfirmed) return;
        addTask(value, status);
    }

    return {
        isDragging,
        onDragOver,
        handleDragOver,
        handleDragLeave,
        handleDragDrop,
        handleAddTask,
    }
}
