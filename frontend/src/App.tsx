import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./api/tasks";
import type { Task, CreateTaskInput, UpdateTaskInput } from "./types";
import { QUERY_KEY } from "./const";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const queryClient = useQueryClient();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEY.tasks,
    queryFn: api.fetchTasks,
  });

  const createMutation = useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.tasks });
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateTaskInput }) =>
      api.updateTask(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.tasks });
      setEditingTask(null);
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || err.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.tasks });
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || err.message);
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      api.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.tasks });
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || err.message);
    },
  });

  const handleSubmit = (input: CreateTaskInput | UpdateTaskInput) => {
    if (editingTask) {
      updateMutation.mutate({ id: editingTask.id, input });
    } else {
      createMutation.mutate(input as CreateTaskInput);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this task?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    statusMutation.mutate({ id, status });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Task Tracker</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 font-medium underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <TaskForm
        initial={editingTask}
        onSubmit={handleSubmit}
        onCancel={editingTask ? () => setEditingTask(null) : undefined}
        isPending={
          editingTask ? updateMutation.isPending : createMutation.isPending
        }
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
          updatingId={
            statusMutation.isPending ? statusMutation.variables?.id : null
          }
        />
      )}
    </div>
  );
}
