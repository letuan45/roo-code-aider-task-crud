import axios from "axios";
import type { Task, CreateTaskInput, UpdateTaskInput } from "../types";

const api = axios.create({ baseURL: "/api" });

export async function fetchTasks(): Promise<Task[]> {
  const { data } = await api.get("/tasks");
  return data;
}

export async function fetchTask(id: number): Promise<Task> {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const { data } = await api.post("/tasks", input);
  return data;
}

export async function updateTask(
  id: number,
  input: UpdateTaskInput
): Promise<Task> {
  const { data } = await api.put(`/tasks/${id}`, input);
  return data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

export async function updateTaskStatus(
  id: number,
  status: string
): Promise<Task> {
  const { data } = await api.patch(`/tasks/${id}/status`, { status });
  return data;
}
