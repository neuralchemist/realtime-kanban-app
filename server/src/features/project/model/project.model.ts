import { Schema, model, Document } from "mongoose";

// version stored in MongoDB database
export interface IProjectMongoDB extends Document {
  title: string;
  description: string;
}

const projectSchema: Schema<IProjectMongoDB> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProjectModel = model<IProjectMongoDB>("Project", projectSchema);
