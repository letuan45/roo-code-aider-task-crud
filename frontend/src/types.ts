export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
}
