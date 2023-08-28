import { IProject } from "@features/project/model";
import { ITask, ITaskCreate, ITaskUpdate } from "../model";

export interface ITaskService {
  findAllByProjectId(projectId: IProject["_id"]): Promise<ITask[]>;
  create(projectId: IProject["_id"], newTask: ITaskCreate): Promise<ITask>;
  updateById(id: ITask["_id"], task: ITaskUpdate ): Promise<ITask>;
  deleteById(id: ITask["_id"]): Promise<ITask["_id"]>;
}
