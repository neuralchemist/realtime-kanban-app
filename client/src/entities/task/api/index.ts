// custom types
import { IProject } from "@entities/project/types";
import { ITask, ITaskCreate, ITaskUpdate } from "../types";
// custom api
import { axiosInstance } from "@common/utils/api";

export class TasksApi {
  static async findTasksByProjectId(
    projectId: IProject["_id"]
  ): Promise<ITask[]> {
    console.log("%cTasksApi -> findTasksByProjectId->", "color: pink");
    try {
      const url = `/projects/${projectId}/tasks`;
      const { data } = await axiosInstance.get<ITask[]>(url);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Could not fetch tasks");
      }
    }
  }

  static async create(
    task: ITaskCreate,
    projectId: IProject["_id"]
  ): Promise<ITask> {
    console.log("%cTasksApi -> create->", "color: pink");
    try {
      const url = `/projects/${projectId}/tasks`;
      const { data } = await axiosInstance.post<ITask>(url, task);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Could not create task");
      }
    }
  }

  static async update(
    task: ITaskUpdate,
    id: ITask["_id"],
    projectId: IProject["_id"]
  ): Promise<ITask> {
    console.log("%cTasksApi -> update->", "color: pink");
    try {
      const url = `/projects/${projectId}/tasks/${id}`;
      const { data } = await axiosInstance.patch<ITask>(url, task);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Could not update task");
      }
    }
  }

  static async delete(
    id: ITask["_id"],
    projectId: IProject["_id"]
  ): Promise<ITask["_id"]> {
    try {
      const url = `/projects/${projectId}/tasks/${id}`;
      const { data } = await axiosInstance.delete<ITask["_id"]>(url);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Could not delete task");
      }
    }
  }
}
