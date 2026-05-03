import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: 1,
  title: "Test task",
  description: "A description",
  status: "TODO",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

describe("TaskItem", () => {
  it("renders task title and description", () => {
    render(
      <TaskItem
        task={makeTask()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByText("Test task")).toBeInTheDocument();
    expect(screen.getByText("A description")).toBeInTheDocument();
  });

  it("renders status badge for TODO", () => {
    render(
      <TaskItem
        task={makeTask({ status: "TODO" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByText("TODO")).toBeInTheDocument();
  });

  it("renders status badge for IN_PROGRESS", () => {
    render(
      <TaskItem
        task={makeTask({ status: "IN_PROGRESS" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByText("IN PROGRESS")).toBeInTheDocument();
  });

  it("renders status badge for DONE", () => {
    render(
      <TaskItem
        task={makeTask({ status: "DONE" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByText("DONE")).toBeInTheDocument();
  });

  it("shows 'Move to IN_PROGRESS' button for TODO tasks", () => {
    render(
      <TaskItem
        task={makeTask({ status: "TODO" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: "Move to IN PROGRESS" })
    ).toBeInTheDocument();
  });

  it("shows 'Move to DONE' button for IN_PROGRESS tasks", () => {
    render(
      <TaskItem
        task={makeTask({ status: "IN_PROGRESS" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: "Move to DONE" })
    ).toBeInTheDocument();
  });

  it("does not show status button for DONE tasks", () => {
    render(
      <TaskItem
        task={makeTask({ status: "DONE" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(
      screen.queryByRole("button", { name: /Move to/ })
    ).not.toBeInTheDocument();
  });

  it("calls onStatusChange when status button clicked", async () => {
    const onStatusChange = vi.fn();
    render(
      <TaskItem
        task={makeTask({ id: 5, status: "TODO" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={onStatusChange}
      />
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Move to IN PROGRESS" })
    );

    expect(onStatusChange).toHaveBeenCalledWith(5, "IN_PROGRESS");
  });

  it("calls onEdit when edit button clicked", async () => {
    const onEdit = vi.fn();
    const task = makeTask();
    render(
      <TaskItem
        task={task}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(onEdit).toHaveBeenCalledWith(task);
  });

  it("calls onDelete when delete button clicked", async () => {
    const onDelete = vi.fn();
    render(
      <TaskItem
        task={makeTask({ id: 10 })}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onStatusChange={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalledWith(10);
  });

  it("disables status button when isUpdating is true", () => {
    render(
      <TaskItem
        task={makeTask({ status: "TODO" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
        isUpdating
      />
    );

    expect(
      screen.getByRole("button", { name: "Move to IN PROGRESS" })
    ).toBeDisabled();
  });

  it("does not render description when null", () => {
    render(
      <TaskItem
        task={makeTask({ description: null })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.queryByText("A description")).not.toBeInTheDocument();
  });
});
