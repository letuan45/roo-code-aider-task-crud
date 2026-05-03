import { describe, it, expect, beforeEach, afterEach } from "vitest";
import prisma from "../lib/prisma";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "./task.service";

describe("task.service", () => {
  // Clean database between tests
  beforeEach(async () => {
    await prisma.task.deleteMany();
  });

  afterEach(async () => {
    await prisma.task.deleteMany();
  });

  // --- CRUD ---

  describe("createTask", () => {
    it("should create a task with default TODO status", async () => {
      const task = await createTask({ title: "Test task" });

      expect(task.id).toBeDefined();
      expect(task.title).toBe("Test task");
      expect(task.status).toBe("TODO");
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();
    });

    it("should create a task with a description", async () => {
      const task = await createTask({
        title: "With desc",
        description: "A description",
      });

      expect(task.description).toBe("A description");
    });
  });

  describe("getTasks", () => {
    it("should return empty array when no tasks", async () => {
      const tasks = await getTasks();
      expect(tasks).toEqual([]);
    });

    it("should return all tasks ordered by newest first", async () => {
      const t1 = await createTask({ title: "First" });
      await new Promise((r) => setTimeout(r, 10));
      const t2 = await createTask({ title: "Second" });

      const tasks = await getTasks();
      expect(tasks).toHaveLength(2);
      expect(tasks[0].id).toBe(t2.id);
      expect(tasks[1].id).toBe(t1.id);
    });
  });

  describe("getTaskById", () => {
    it("should return the task by id", async () => {
      const created = await createTask({ title: "Find me" });
      const found = await getTaskById(created.id);

      expect(found.id).toBe(created.id);
      expect(found.title).toBe("Find me");
    });

    it("should throw when task not found", async () => {
      await expect(getTaskById(999)).rejects.toThrow("not found");
    });
  });

  describe("updateTask", () => {
    it("should update task title", async () => {
      const task = await createTask({ title: "Old title" });
      const updated = await updateTask(task.id, { title: "New title" });

      expect(updated.title).toBe("New title");
    });

    it("should update task description", async () => {
      const task = await createTask({ title: "T", description: "Old desc" });
      const updated = await updateTask(task.id, { description: "New desc" });

      expect(updated.description).toBe("New desc");
    });

    it("should throw when task not found", async () => {
      await expect(
        updateTask(999, { title: "Nope" })
      ).rejects.toThrow("not found");
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      const task = await createTask({ title: "Delete me" });
      await deleteTask(task.id);

      const tasks = await getTasks();
      expect(tasks).toHaveLength(0);
    });

    it("should throw when task not found", async () => {
      await expect(deleteTask(999)).rejects.toThrow("not found");
    });
  });

  // --- Status Transitions ---

  describe("updateTaskStatus — valid transitions", () => {
    it("should transition TODO → IN_PROGRESS", async () => {
      const task = await createTask({ title: "T" });
      const updated = await updateTaskStatus(task.id, "IN_PROGRESS");

      expect(updated.status).toBe("IN_PROGRESS");
    });

    it("should transition IN_PROGRESS → DONE", async () => {
      const task = await createTask({ title: "T" });
      await updateTaskStatus(task.id, "IN_PROGRESS");
      const updated = await updateTaskStatus(task.id, "DONE");

      expect(updated.status).toBe("DONE");
    });
  });

  describe("updateTaskStatus — invalid transitions", () => {
    it("should reject TODO → DONE (skip IN_PROGRESS)", async () => {
      const task = await createTask({ title: "T" });

      await expect(
        updateTaskStatus(task.id, "DONE")
      ).rejects.toThrow("Invalid status transition");
    });

    it("should reject DONE → TODO", async () => {
      const task = await createTask({ title: "T" });
      await updateTaskStatus(task.id, "IN_PROGRESS");
      await updateTaskStatus(task.id, "DONE");

      await expect(
        updateTaskStatus(task.id, "TODO")
      ).rejects.toThrow("Invalid status transition");
    });

    it("should reject DONE → IN_PROGRESS", async () => {
      const task = await createTask({ title: "T" });
      await updateTaskStatus(task.id, "IN_PROGRESS");
      await updateTaskStatus(task.id, "DONE");

      await expect(
        updateTaskStatus(task.id, "IN_PROGRESS")
      ).rejects.toThrow("Invalid status transition");
    });

    it("should reject IN_PROGRESS → TODO (backward)", async () => {
      const task = await createTask({ title: "T" });
      await updateTaskStatus(task.id, "IN_PROGRESS");

      await expect(
        updateTaskStatus(task.id, "TODO")
      ).rejects.toThrow("Invalid status transition");
    });

    it("should reject same-status transition", async () => {
      const task = await createTask({ title: "T" });

      await expect(
        updateTaskStatus(task.id, "TODO")
      ).rejects.toThrow("Invalid status transition");
    });
  });
});
