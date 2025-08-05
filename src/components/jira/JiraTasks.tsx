import {IoAddOutline, IoCheckmarkCircleOutline} from 'react-icons/io5';
import {Task, TaskStatus} from "../../interfaces";
import {SingleTask} from "./SingleTask.tsx";
import classNames from 'classnames';
import {DragEvent, useState} from "react";
import {useTaskStore} from "../../stores";
import {useShallow} from "zustand/react/shallow";
interface Props {
  title: string;
  value: TaskStatus;
  tasks: Task[]
}


export const JiraTasks = ({ title, value, tasks }: Props) => {
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
    onTaskDrop(value)
  }
  const addTask = useTaskStore( useShallow( state => state.addTask ) );
  const handleAddTask = () => {
    addTask('Nuevo Titulo', value)
  }
  return (
    <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        className={
      classNames( '!text-black relative flex flex-col border-4 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]', {
        'border-blue-500 border-dotted': isDragging,
        'border-green-500 border-dotted': isDragging && onDragOver,
      })
        }>


      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>

      </div>

      {/* Task Items */ }
      <div className="h-full w-full">

        {
          tasks.map( task => (
              <SingleTask key={task.id} task={task} />
          ))
        }

      </div>
    </div>
  );
};