import type { Task } from "../types";

const STATUS_COLORS: Record<string, string> = {
  TODO: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
};

const NEXT_STATUS: Record<string, string | null> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "DONE",
  DONE: null,
};

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
  isUpdating?: boolean;
}

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  isUpdating,
}: TaskItemProps) {
  const next = NEXT_STATUS[task.status];

  return (
    <div className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{task.title}</h3>
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[task.status]}`}
          >
            {task.status.replace("_", " ")}
          </span>
        </div>
        {task.description && (
          <p className="mt-1 text-sm text-gray-600">{task.description}</p>
        )}
      </div>
      <div className="ml-4 flex items-center gap-1">
        {next && (
          <button
            onClick={() => onStatusChange(task.id, next)}
            disabled={isUpdating}
            className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            Move to {next.replace("_", " ")}
          </button>
        )}
        <button
          onClick={() => onEdit(task)}
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
