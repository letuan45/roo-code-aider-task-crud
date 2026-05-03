import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockGet, mockPost, mockPut, mockPatch, mockDelete } = vi.hoisted(
  () => ({
    mockGet: vi.fn(),
    mockPost: vi.fn(),
    mockPut: vi.fn(),
    mockPatch: vi.fn(),
    mockDelete: vi.fn(),
  })
);

vi.mock("axios", () => ({
  default: {
    create: () => ({
      get: mockGet,
      post: mockPost,
      put: mockPut,
      patch: mockPatch,
      delete: mockDelete,
    }),
  },
}));

import {
  fetchTasks,
  fetchTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "./tasks";

const mockTask = {
  id: 1,
  title: "Test",
  description: null,
  status: "TODO" as const,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("tasks API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchTasks", () => {
    it("returns task list", async () => {
      mockGet.mockResolvedValueOnce({ data: [mockTask] });
      const result = await fetchTasks();

      expect(mockGet).toHaveBeenCalledWith("/tasks");
      expect(result).toEqual([mockTask]);
    });
  });

  describe("fetchTask", () => {
    it("returns a single task", async () => {
      mockGet.mockResolvedValueOnce({ data: mockTask });
      const result = await fetchTask(1);

      expect(mockGet).toHaveBeenCalledWith("/tasks/1");
      expect(result).toEqual(mockTask);
    });
  });

  describe("createTask", () => {
    it("creates and returns a task", async () => {
      const input = { title: "New", description: "Desc" };
      mockPost.mockResolvedValueOnce({ data: { ...mockTask, ...input } });
      const result = await createTask(input);

      expect(mockPost).toHaveBeenCalledWith("/tasks", input);
      expect(result.title).toBe("New");
    });
  });

  describe("updateTask", () => {
    it("updates and returns a task", async () => {
      const input = { title: "Updated" };
      mockPut.mockResolvedValueOnce({ data: { ...mockTask, ...input } });
      const result = await updateTask(1, input);

      expect(mockPut).toHaveBeenCalledWith("/tasks/1", input);
      expect(result.title).toBe("Updated");
    });
  });

  describe("deleteTask", () => {
    it("deletes a task", async () => {
      mockDelete.mockResolvedValueOnce({});
      await deleteTask(1);

      expect(mockDelete).toHaveBeenCalledWith("/tasks/1");
    });
  });

  describe("updateTaskStatus", () => {
    it("updates status and returns task", async () => {
      mockPatch.mockResolvedValueOnce({
        data: { ...mockTask, status: "IN_PROGRESS" },
      });
      const result = await updateTaskStatus(1, "IN_PROGRESS");

      expect(mockPatch).toHaveBeenCalledWith("/tasks/1/status", {
        status: "IN_PROGRESS",
      });
      expect(result.status).toBe("IN_PROGRESS");
    });
  });
});
