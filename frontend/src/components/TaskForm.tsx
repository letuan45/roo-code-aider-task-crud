import { useState, useEffect } from "react";
import type { Task, CreateTaskInput, UpdateTaskInput } from "../types";

interface TaskFormProps {
  initial?: Task | null;
  onSubmit: (data: CreateTaskInput | UpdateTaskInput) => void;
  onCancel?: () => void;
  isPending?: boolean;
}

export default function TaskForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description ?? "");
    }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim() || undefined });
    if (!initial) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <h2 className="mb-3 text-lg font-semibold text-gray-800">
        {initial ? "Edit Task" : "New Task"}
      </h2>
      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Task title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Optional description"
          rows={2}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
