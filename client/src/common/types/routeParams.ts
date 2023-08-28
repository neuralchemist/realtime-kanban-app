import { IProject } from "../../entities/project/types";
import { ITask } from "../../entities/task/types";

export interface IProjectId {
  projectId: IProject["_id"];
}

export interface ITaskId {
  taksId: ITask["_id"];
}
