import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/tasks";
import type { Task, TaskStatus, CreateTaskInput, UpdateTaskInput } from "../types";
import { QUERY_KEY } from "../const";

function extractError(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const resp = (err as { response?: { data?: { error?: string } } }).response;
    if (resp?.data?.error) return resp.data.error;
  }
  if (err instanceof Error) return err.message;
  return "An unexpected error occurred";
}

export function useTasks() {
  const queryClient = useQueryClient();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dismissError = useCallback(() => setError(null), []);

  const query = useQuery({
    queryKey: QUERY_KEY.tasks,
    queryFn: api.fetchTasks,
  });

  const createMutation = useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.tasks });
      setError(null);
    },
    onError: (err) => setError(extractError(err)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateTaskInput }) =>
      api.updateTask(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.tasks });
      setEditingTask(null);
      setError(null);
    },
    onError: (err) => setError(extractError(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.tasks });
      setError(null);
    },
    onError: (err) => setError(extractError(err)),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      api.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.tasks });
      setError(null);
    },
    onError: (err) => setError(extractError(err)),
  });

  const handleSubmit = useCallback(
    (input: CreateTaskInput | UpdateTaskInput) => {
      if (editingTask) {
        updateMutation.mutate({ id: editingTask.id, input });
      } else {
        createMutation.mutate(input as CreateTaskInput);
      }
    },
    [editingTask, createMutation, updateMutation]
  );

  const handleDelete = useCallback(
    (id: number) => {
      if (confirm("Delete this task?")) {
        deleteMutation.mutate(id);
      }
    },
    [deleteMutation]
  );

  const handleStatusChange = useCallback(
    (id: number, status: TaskStatus) => {
      statusMutation.mutate({ id, status });
    },
    [statusMutation]
  );

  const cancelEditing = useCallback(() => setEditingTask(null), []);

  return {
    // Data
    tasks: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,

    // Editing
    editingTask,
    setEditingTask,
    cancelEditing,

    // Error
    error,
    dismissError,

    // Mutations
    handleSubmit,
    handleDelete,
    handleStatusChange,
    isCreatePending: createMutation.isPending,
    isUpdatePending: updateMutation.isPending,
    updatingTaskId: statusMutation.isPending ? statusMutation.variables?.id ?? null : null,
  };
}