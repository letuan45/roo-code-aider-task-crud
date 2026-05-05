import { Request, Response } from "express";
import * as taskService from "../services/task.service";
import { asyncHandler } from "../lib/async-handler";

function getIdParam(req: Request): number {
  return parseInt(req.params.id as string, 10);
}

export const getTasks = asyncHandler(async (_req: Request, res: Response) => {
  const tasks = await taskService.getTasks();
  res.json(tasks);
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const id = getIdParam(req);
  const task = await taskService.getTaskById(id);
  res.json(task);
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const task = await taskService.createTask({ title, description });
  res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const id = getIdParam(req);
  const { title, description } = req.body;
  const task = await taskService.updateTask(id, { title, description });
  res.json(task);
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const id = getIdParam(req);
  await taskService.deleteTask(id);
  res.status(200).json({ message: "Task deleted" });
});

export const updateTaskStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const id = getIdParam(req);
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ error: "Status is required" });
      return;
    }
    const task = await taskService.updateTaskStatus(id, status);
    res.json(task);
  }
);
