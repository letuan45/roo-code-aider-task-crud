import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "./TaskList";
import type { Task } from "../types";

const makeTask = (id: number, overrides: Partial<Task> = {}): Task => ({
  id,
  title: `Task ${id}`,
  description: null,
  status: "TODO",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

describe("TaskList", () => {
  it("shows empty state when no tasks", () => {
    render(
      <TaskList
        tasks={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByText(/No tasks yet/)).toBeInTheDocument();
  });

  it("renders multiple tasks", () => {
    const tasks = [makeTask(1), makeTask(2), makeTask(3)];
    render(
      <TaskList
        tasks={tasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  it("calls onEdit when edit is clicked on a task", async () => {
    const onEdit = vi.fn();
    const tasks = [makeTask(1)];
    render(
      <TaskList
        tasks={tasks}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(onEdit).toHaveBeenCalledWith(tasks[0]);
  });

  it("calls onDelete when delete is clicked", async () => {
    const onDelete = vi.fn();
    const tasks = [makeTask(1)];
    render(
      <TaskList
        tasks={tasks}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onStatusChange={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onStatusChange when status button clicked", async () => {
    const onStatusChange = vi.fn();
    const tasks = [makeTask(1, { status: "TODO" })];
    render(
      <TaskList
        tasks={tasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={onStatusChange}
      />
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Move to IN PROGRESS" })
    );

    expect(onStatusChange).toHaveBeenCalledWith(1, "IN_PROGRESS");
  });

  it("passes updatingId to the correct task", () => {
    const tasks = [makeTask(1, { status: "TODO" }), makeTask(2, { status: "TODO" })];
    render(
      <TaskList
        tasks={tasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
        updatingId={1}
      />
    );

    const buttons = screen.getAllByRole("button", { name: "Move to IN PROGRESS" });
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });
});
