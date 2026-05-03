import prisma from "../lib/prisma";
import type { TaskStatus } from "@prisma/client";

const VALID_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  TODO: ["IN_PROGRESS"],
  IN_PROGRESS: ["DONE"],
  DONE: [],
};

interface CreateTaskInput {
  title: string;
  description?: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
}

function validateStatusTransition(
  current: TaskStatus,
  next: TaskStatus
): void {
  const allowed = VALID_TRANSITIONS[current];
  if (!allowed.includes(next)) {
    throw new Error(
      `Invalid status transition: ${current} → ${next}`
    );
  }
}

export async function createTask(input: CreateTaskInput) {
  return prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
    },
  });
}

export async function getTasks() {
  return prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTaskById(id: number) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }
  return task;
}

export async function updateTask(id: number, input: UpdateTaskInput) {
  // Ensure task exists
  await getTaskById(id);

  return prisma.task.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
    },
  });
}

export async function deleteTask(id: number) {
  // Ensure task exists
  await getTaskById(id);

  return prisma.task.delete({ where: { id } });
}

export async function updateTaskStatus(id: number, status: TaskStatus) {
  const task = await getTaskById(id);
  validateStatusTransition(task.status, status);

  return prisma.task.update({
    where: { id },
    data: { status },
  });
}
