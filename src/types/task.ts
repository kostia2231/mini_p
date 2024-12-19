import { APIResponse } from "./common";

export type Status = "todo" | "in-progress" | "done";
export type Priority = "low" | "medium" | "high";

export interface ICreateTaskBody {
  title: string;
  description: string;
  status?: Status;
  priority?: Priority;
}

export interface ITask {
  id?: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status?: Status;
  priority?: Priority;
}

export interface ITaskResponse extends APIResponse {
  data: ITask | ITask[];
}
