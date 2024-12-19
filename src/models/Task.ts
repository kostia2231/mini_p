import mongoose, { model, Schema, Document } from "mongoose";
import { Priority, Status } from "../types/task";

interface ITask extends Document {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  userId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = model<ITask>("Task", TaskSchema);
export default Task;
