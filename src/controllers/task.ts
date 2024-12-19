import { Request, Response } from "express";
import { ICreateTaskBody, ITaskResponse, ITask } from "../types/task";
import Task from "../models/Task";

async function createTask(
  req: Request<{}, {}, ICreateTaskBody>,
  res: Response<ITaskResponse>,
): Promise<void> {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user;

    if (!title || !description || !userId) {
      res.status(400).json({
        success: false,
        message: "all fileds required",
        data: [],
      });
      return;
    }

    const task: ITask = {
      title,
      description,
      status: "todo",
      priority,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await Task.create(task);

    res
      .status(201)
      .json({ success: true, data: task, message: "task was created" });
  } catch (e) {
    res
      .status(500)
      .json({
        success: true,
        data: [],
        message: "server error",
        error: (e as Error).stack,
      });
  }
}

export { createTask };
