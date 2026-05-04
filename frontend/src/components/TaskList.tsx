import type { Task, TaskStatus } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
  updatingId?: number | null;
}

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  updatingId,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No tasks yet. Create one above.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          isUpdating={updatingId === task.id}
        />
      ))}
    </div>
  );
}
