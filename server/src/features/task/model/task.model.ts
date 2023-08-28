import { Schema, model, Document, Types } from "mongoose";

// version stored in MongoDB database
export interface ITaskMongoDB extends Document {
  title: string;
  description: string;
  status: "pending" | "ongoing" | "completed";
  projectId: Types.ObjectId;
}

const taskSchema: Schema<ITaskMongoDB> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "pending" },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

export const TaskModel = model<ITaskMongoDB>("Task", taskSchema);
