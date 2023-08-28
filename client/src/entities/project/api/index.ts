import { IProject, IProjectCreate, IProjectUpdate } from "../types";
import { axiosInstance } from "@common/utils/api";

export class ProjectsApi {
  static async findAll(): Promise<IProject[]> {
    console.log("%cProjectsAPI -> find all projects:", "color: orange");
    try {
      const url = `/projects`;
      const { data } = await axiosInstance.get<IProject[]>(url);
      return data;
    } catch (err) {
      throw new Error("Could not fetch projects");
    }
  }

  static async create(project: IProjectCreate): Promise<IProject> {
    console.log("%cProjectsAPI -> create project:", "color: orange");
    try {
      const url = `/projects`;
      const { data } = await axiosInstance.post<IProject>(url, project);
      return data;
    } catch (err) {
      throw new Error("Could not create project");
    }
  }

  static async update(
    id: IProject["_id"],
    project: IProjectUpdate
  ): Promise<IProject> {
    console.log("%cProjectsAPI -> update project:", "color: orange");
    try {
      const url = `/projects/${id}`;
      const { data } = await axiosInstance.patch<IProject>(url, project);
      return data;
    } catch (err) {
      throw new Error("Could not update project");
    }
  }

  static async delete(id: string): Promise<IProject["_id"]> {
    console.log("%cProjectsAPI -> delete project:", "color: orange");
    try {
      const url = `/projects/${id}`;
      const { data } = await axiosInstance.delete<IProject["_id"]>(url);
      return data;
    } catch (err) {
      throw new Error("Could not delete project");
    }
  }
}
