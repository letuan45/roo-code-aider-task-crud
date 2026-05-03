import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  it("renders create form with empty fields", () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task title")).toHaveValue("");
    expect(screen.getByPlaceholderText("Optional description")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("renders edit form with pre-filled fields", () => {
    const onSubmit = vi.fn();
    const task = {
      id: 1,
      title: "Existing",
      description: "Desc",
      status: "TODO" as const,
      createdAt: "",
      updatedAt: "",
    };

    render(<TaskForm initial={task} onSubmit={onSubmit} />);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task title")).toHaveValue("Existing");
    expect(screen.getByPlaceholderText("Optional description")).toHaveValue(
      "Desc"
    );
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("calls onSubmit with form data on create", async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByPlaceholderText("Task title"), "New Task");
    await userEvent.type(
      screen.getByPlaceholderText("Optional description"),
      "A description"
    );
    await userEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "A description",
    });
  });

  it("does not submit with empty title", async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows cancel button and calls onCancel", async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} />);

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalled();
  });

  it("shows pending state on button", () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} isPending />);

    expect(screen.getByRole("button", { name: "Saving..." })).toBeDisabled();
  });

  it("clears form after create submit", async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByPlaceholderText("Task title"), "T");
    await userEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(screen.getByPlaceholderText("Task title")).toHaveValue("");
  });
});
