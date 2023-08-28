import { IProject, IProjectCreate, IProjectUpdate } from "../model";

export interface IProjectRepository {
  findAll(): Promise<IProject[]>;
  findById(id: string): Promise<IProject>;
  create(project: IProjectCreate): Promise<IProject>;
  deleteById(id: IProject["_id"]): Promise<IProject["_id"]>;
  updateById(id: IProject["_id"], project: IProjectUpdate): Promise<IProject>;
}
