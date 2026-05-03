import { Request, Response } from "express";
import * as taskService from "../services/task.service";

function getIdParam(req: Request): number {
  return parseInt(req.params.id as string, 10);
}

function handleServiceError(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "Unknown error";
  const status = message.includes("not found") ? 404 : 400;
  res.status(status).json({ error: message });
}

export async function getTasks(_req: Request, res: Response) {
  const tasks = await taskService.getTasks();
  res.json(tasks);
}

export async function getTaskById(req: Request, res: Response) {
  try {
    const id = getIdParam(req);
    const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (error) {
    handleServiceError(res, error);
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = await taskService.createTask({ title, description });
    res.status(201).json(task);
  } catch (error) {
    handleServiceError(res, error);
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const id = getIdParam(req);
    const { title, description } = req.body;
    const task = await taskService.updateTask(id, { title, description });
    res.json(task);
  } catch (error) {
    handleServiceError(res, error);
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const id = getIdParam(req);
    await taskService.deleteTask(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    handleServiceError(res, error);
  }
}

export async function updateTaskStatus(req: Request, res: Response) {
  try {
    const id = getIdParam(req);
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }
    const task = await taskService.updateTaskStatus(id, status);
    res.json(task);
  } catch (error) {
    handleServiceError(res, error);
  }
}
