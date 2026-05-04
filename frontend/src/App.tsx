import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const {
    tasks,
    isLoading,
    isError,
    editingTask,
    setEditingTask,
    cancelEditing,
    error,
    dismissError,
    handleSubmit,
    handleDelete,
    handleStatusChange,
    isCreatePending,
    isUpdatePending,
    updatingTaskId,
  } = useTasks();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Task Tracker</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          <button
            onClick={dismissError}
            className="ml-2 font-medium underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <TaskForm
        initial={editingTask}
        onSubmit={handleSubmit}
        onCancel={editingTask ? cancelEditing : undefined}
        isPending={editingTask ? isUpdatePending : isCreatePending}
      />

      {isLoading && (
        <p className="py-8 text-center text-gray-500">Loading tasks...</p>
      )}

      {isError && (
        <p className="py-8 text-center text-red-500">
          Failed to load tasks. Is the backend running?
        </p>
      )}

      {!isLoading && !isError && (
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          updatingId={updatingTaskId}
        />
      )}
    </div>
  );
}